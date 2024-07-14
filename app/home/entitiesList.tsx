import { FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

// You can import supported modules from npm
import { List, Searchbar, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWebsocketManager } from '@/stores/websocket';
import { AuthData } from '@/constants/AuthData';
import * as SecureStore from 'expo-secure-store';
import { states } from '@/types/messages';


type Entity = {
    "entity_id": string,
    "friendly_name": string,
}

async function getValue(key: string) {
    let result = await SecureStore.getItemAsync(key);
    //console.log(`${key}: ${result}`);
    return result;
}

export default function EntitiesList() {
    const connect = useWebsocketManager((state) => state.connect);
    const sendMessage = useWebsocketManager((state) => state.sendMessage);
    const subscribe = useWebsocketManager((state) => state.subscribe);

    const [entities, setEntities] = useState<Array<Entity>>();

    useEffect(() => {
        async function load() {
            const access_token = await getValue(AuthData.access_token);
            //const refresh_token = await getValue(AuthData.refresh_token);
            //const ha_url = await getValue(AuthData.ha_url);
            //const websocket_url = `${ha_url}/api/websocket`;
            //console.log(websocket_url);
            if (access_token) {
                //connect(websocket_url, access_token);
                subscribe((event) => {
                    //console.log("from entitiesList");
                    //console.log(event.data);
                    const data = JSON.parse(event.data);
                    if (data.type === "auth_ok") {
                        sendMessage(states());
                    }

                    else if (data.type === "result") {
                        //const firstEntity = data.result[0];
                        //console.log(firstEntity);
                        //console.log(firstEntity.friendly_name);
                        //console.log(firstEntity.entity_id);
                        const new_entities = data.result.map((item: Entity) => {
                            return {
                                "entity_id": item.entity_id,
                                "friendly_name": item.attributes.friendly_name,
                            };
                        }).sort(
                            (a: Entity, b: Entity) => a.entity_id.localeCompare(b.entity_id)
                        );
                        //console.log(new_entities[0]);
                        //console.log(new_entities);
                        setEntities(new_entities);
                    }
                });

            }
            /*
            const ws = new WebSocket(websocket_url);
            ws.onopen = () => {
              // connection opened
              ws.send(JSON.stringify({
                "type": "auth",
                "access_token": access_token
              }));
      
              ws.send(JSON.stringify({
                "id": 1,
                "type": "get_states"
              }));
            };
            
            ws.onmessage = e => {
              // a message was received
              console.log(e.data);
            };
            
            ws.onerror = e => {
              // an error occurred
              console.log(e);
            };
            
            ws.onclose = e => {
              // connection closed
              console.log(e.code, e.reason);
            };
      
            */

        }

        load();

    }, []);


    const renderItem = useCallback(({ item }: { item: Entity }) => (

        <List.Item
            title={item.entity_id}
            description={item.friendly_name}
            left={props => <MaterialCommunityIcons name="play" size={24} style={styles.icons} color="black" />}
            onPress={
                (e) => setSearchQuery(item.entity_id)
            }
        />

    ), []);

    const filterData = useCallback((query: string) => {
        const q = query.toLowerCase();
        if (entities) {
            return entities.filter((item: Entity) => item.entity_id.includes(q) || item.friendly_name.includes(q)).slice(0, 30);
        }
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    return (

        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search Entity"
                onChangeText={(text) => {
                    setSearchQuery(text);
                    if (text.length === 0) {
                        setShowAutocomplete(false);
                    }

                    else {
                        setShowAutocomplete(true);
                    }
                }}
                value={searchQuery}
            />
            <FlatList style={styles.paragraph}
                data={showAutocomplete ? filterData(searchQuery) : entities}
                renderItem={renderItem}
                keyExtractor={item => item.entity_id}
                keyboardShouldPersistTaps='handled'
            //initialNumToRender={15}
            //windowSize={30}
            //getItemLayout={(data, index) => (
            // {length: 70, offset: 70 * index, index}
            //)}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        marginTop: 40,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icons: {
        marginTop: 15,
        paddingRight: 10,

    }
});

import { FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { memo, useCallback, useEffect, useState } from 'react';

// You can import supported modules from npm
import { List, Searchbar, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWebsocketManager } from '@/stores/websocket';
import { AuthData } from '@/constants/AuthData';
import * as SecureStore from 'expo-secure-store';
import { states } from '@/types/messages';
import { Entity, EntityFromHA } from '@/types/entities';
import ListSearch from '@/components/ListSearch';

async function getValue(key: string) {
    let result = await SecureStore.getItemAsync(key);
    //console.log(`${key}: ${result}`);
    return result;
}

export default function EntitiesList() {
    const connect = useWebsocketManager((state) => state.connect);
    const sendMessage = useWebsocketManager((state) => state.sendMessage);
    const subscribe = useWebsocketManager((state) => state.subscribe);

    const [entities, setEntities] = useState<Array<Entity>>([]);

    useEffect(() => {
        async function load() {
            const access_token = await getValue(AuthData.access_token);
            if (access_token) {
                subscribe((event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === "auth_ok") {
                        sendMessage(states());
                    }

                    else if (data.type === "result") {
                        const new_entities = data.result.map((item: EntityFromHA) => {
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
        }

        load();

    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ListSearch entities={entities} placeholder='Search Entities'></ListSearch>
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
});



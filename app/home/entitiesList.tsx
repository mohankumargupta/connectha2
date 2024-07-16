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

//const ITEM_HEIGHT = 70;

/*
type Entity = {
    "entity_id": string,
    "friendly_name": string,
}

type EntityFromHA = {
    "entity_id": string,
    "attributes": {
        "friendly_name": string
    }
}
*/

async function getValue(key: string) {
    let result = await SecureStore.getItemAsync(key);
    //console.log(`${key}: ${result}`);
    return result;
}

/*
const EntityItem = memo(({ item, setSearchQuery }) => (
    <List.Item
        title={item.entity_id}
        description={item.friendly_name}
        left={props => <MaterialCommunityIcons name="play" size={24} style={styles.icons} color="black" />}
        onPress={() => setSearchQuery(item.entity_id)}
    />
));
*/

/*
type EntityItemProps = {
    item: Entity
};

const EntityItem = memo(({ item }: EntityItemProps) => (
    <List.Item
        title={item.entity_id}
        description={item.friendly_name}
        left={() => <MaterialCommunityIcons name="play" size={24} color="black" />}
        onPress={() => console.log(item.entity_id)}
    />
));
*/


export default function EntitiesList() {
    const connect = useWebsocketManager((state) => state.connect);
    const sendMessage = useWebsocketManager((state) => state.sendMessage);
    const subscribe = useWebsocketManager((state) => state.subscribe);

    const [entities, setEntities] = useState<Array<Entity>>([]);
    //const [filteredEntities, setFilteredEntities] = useState<Array<Entity>>([]);
    //const [searchQuery, setSearchQuery] = useState('');
    //const [showAutocomplete, setShowAutocomplete] = useState(false);

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


    /*
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
    */

    /*
    const filterData = (query: string) => {
        const q = query.toLowerCase();
        //console.log(q);
        //console.log(entities);
        if (entities) {
            //console.log(entities[0]);
            //console.log(entities[0].entity_id);
            //console.log(entities[0].friendly_name);
            const result = entities.filter((item: Entity) =>
                item.entity_id !== undefined && item.friendly_name !== undefined &&
                (item.entity_id.includes(q) ||
                    item.friendly_name.includes(q)));
            setFilteredEntities(result);
        }
    }
    */

    return (
        <SafeAreaView style={styles.container}>
            <ListSearch entities={entities} placeholder='Search Entities'></ListSearch>
        </SafeAreaView>
    );

    /*
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
                         filterData(text);
                     }
                 }}
                 value={searchQuery}
             />
 
             {showAutocomplete ?
                 <FlatList style={styles.paragraph}
                     data={filteredEntities}
                     renderItem={({ item }) => (
                         <EntityItem item={item} />
                     )}
                     keyExtractor={item => item.entity_id}
                     keyboardShouldPersistTaps='handled'
                     getItemLayout={(data, index) => (
                         { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                     )}
                 />
                 :
                 <FlatList style={styles.paragraph}
                     data={entities}
                     renderItem={({ item }) => (
                         <EntityItem item={item} />
                     )}
                     keyExtractor={item => item.entity_id}
                     keyboardShouldPersistTaps='handled'
                     getItemLayout={(data, index) => (
                         { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                     )}
                 />
 
             }
 
         </SafeAreaView>
 
     );
     */
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



import { FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { memo, useEffect, useState } from 'react';

// You can import supported modules from npm
import { List, Searchbar, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWebsocketManager } from '@/stores/websocket';
import { AuthData } from '@/constants/AuthData';
import * as SecureStore from 'expo-secure-store';
import { states } from '@/types/messages';
import { Entity, EntityFromHA } from '@/types/entities';
import ListSearch, { FlatListItem, ListItemProps } from '@/components/ListSearch';
import { router, useNavigation, useRouter } from 'expo-router';
import { route_options } from '@/constants/routes';
import useStateCallback from '../common/usestatecallback';

async function getValue(key: string) {
    let result = await SecureStore.getItemAsync(key);
    //console.log(`${key}: ${result}`);
    return result;
}

export default function EntitiesList() {
    const connect = useWebsocketManager((state) => state.connect);
    const sendMessage = useWebsocketManager((state) => state.sendMessage);
    const subscribe = useWebsocketManager((state) => state.subscribe);
    const unsubscribe = useWebsocketManager((state) => state.unsubscribe);
    const [entities, setEntities] = useState<Array<FlatListItem>>([]);
    const [latestEntityID, setLatestEntityID] = useState<number | undefined>(undefined);
    const navigation = useNavigation();
    const isFocused = navigation.isFocused;
    const [messageid, setmessageid] = useStateCallback(0);


    const EntityItem = memo(({ item }: ListItemProps) => (
        <List.Item
            title={item.key}
            description={item.name}
            left={() => <MaterialCommunityIcons name="play" size={24} color="black" />}
            onPress={() => {
                router.push({
                    pathname: route_options.iconsList, params: {
                        entity_id: item.key,
                        friendly_name: item.name,
                    }
                });
            }}
        />
    ));

    const renderItem = ({ item }: ListItemProps) => {
        return <EntityItem item={item} />;
    };

    async function load() {
        subscribe((event) => {
            const data = JSON.parse(event.data);
            console.log("entitesList");
            console.log(messageid);
            console.log(data.id);


            if (data.type === "result" && data.result && "map" in data.result) {

                //console.log(`here: ${data.id}`);
                const new_entities: Array<FlatListItem> = data.result.map((item: EntityFromHA): FlatListItem => {
                    return {
                        "key": item.entity_id,
                        "name": item.attributes.friendly_name,
                        "icon": "play"
                    };
                }).sort(
                    (a: FlatListItem, b: FlatListItem) => a.key.localeCompare(b.key)
                );
                //console.log(new_entities[0]);
                //console.log(new_entities);
                setEntities(new_entities);
                setLatestEntityID(data.id);

            }
        });
        const id = sendMessage(states());
        console.log(`id: ${id}`);
        //setmessageid(previous_id => id);
        setmessageid(id);
        //console.log(`states send message id: ${id}`);
        //console.log(`states send message id: ${messageid}`);
    }

    useEffect(() => {
        //console.log("useffect empty called");
        console.log("Im inside entitiesList now.")
        load();
        //console.log(navigation.getState());
        return () => {
            console.log("empty useffect cleanup called");
        };
    }, []);

    useEffect(() => {
        //console.log("isfocused useeffect called");
        return () => {
            //console.log("isfocused useeffect cleanup called");
        }
    }, [isFocused]);


    return (
        <SafeAreaView style={styles.container}>
            {messageid === latestEntityID && <ListSearch entities={entities} placeholder='Search Entities' renderItem={renderItem}></ListSearch>}
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



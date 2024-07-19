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
import { Routes } from '@/constants/routes';


async function getValue(key: string) {
    let result = await SecureStore.getItemAsync(key);
    //console.log(`${key}: ${result}`);
    return result;
}

const EntityItem = memo(({ item }: ListItemProps) => (
    <List.Item
        title={item.key}
        description={item.name}
        left={() => <MaterialCommunityIcons name="play" size={24} color="black" />}
        onPress={() => {
            router.push({
                pathname: Routes.icons, params: {
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

export default function EntitiesList() {
    const connect = useWebsocketManager((state) => state.connect);
    const sendMessage = useWebsocketManager((state) => state.sendMessage);
    const subscribe = useWebsocketManager((state) => state.subscribe);
    const unsubscribe = useWebsocketManager((state) => state.unsubscribe);
    const [entities, setEntities] = useState<Array<FlatListItem>>([]);
    const navigation = useNavigation();
    const isFocused = navigation.isFocused;

    useEffect(() => {
        async function load() {

            const access_token = await getValue(AuthData.access_token);
            if (access_token) {
                subscribe((event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === "auth_ok") {
                        //sendMessage(states());
                    }

                    else if (data.type === "result") {
                        const new_entities = data.result.map((item: EntityFromHA): FlatListItem => {
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
                    }
                });
                sendMessage(states());


            }
        }

        load();
        console.log(navigation.getState());
        return () => {
            console.log("lost focus in entitieslist");
            unsubscribe();
        };
    }, [isFocused]);


    return (
        <SafeAreaView style={styles.container}>
            <ListSearch entities={entities} placeholder='Search Entities' renderItem={renderItem}></ListSearch>
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



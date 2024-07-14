import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { memo, useCallback, useEffect, useState } from 'react';
import { List, Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWebsocketManager } from '@/stores/websocket';
import { AuthData } from '@/constants/AuthData';
import * as SecureStore from 'expo-secure-store';
import { states } from '@/types/messages';

type Entity = {
    entity_id: string;
    friendly_name: string;
};

async function getValue(key: string) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

const EntityItem = memo(({ item, setSearchQuery }) => (
    <List.Item
        title={item.entity_id}
        description={item.friendly_name}
        left={props => <MaterialCommunityIcons name="play" size={24} style={styles.icons} color="black" />}
        onPress={() => setSearchQuery(item.entity_id)}
    />
));

export default function EntitiesList() {
    const connect = useWebsocketManager(state => state.connect);
    const sendMessage = useWebsocketManager(state => state.sendMessage);
    const subscribe = useWebsocketManager(state => state.subscribe);

    const [entities, setEntities] = useState<Array<Entity>>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    useEffect(() => {
        async function load() {
            const access_token = await getValue(AuthData.access_token);
            if (access_token) {
                subscribe(event => {
                    const data = JSON.parse(event.data);
                    if (data.type === 'auth_ok') {
                        sendMessage(states());
                    } else if (data.type === 'result') {
                        const new_entities = data.result
                            .map((item: Entity) => ({
                                entity_id: item.entity_id,
                                friendly_name: item.attributes.friendly_name,
                            }))
                            .sort((a: Entity, b: Entity) => a.entity_id.localeCompare(b.entity_id));
                        setEntities(new_entities);
                    }
                });
            }
        }

        load();
    }, [sendMessage, subscribe]);

    const filterData = useCallback(
        (query: string) => {
            const q = query.toLowerCase();
            if (entities) {
                return entities.filter(
                    (item: Entity) =>
                        item.entity_id.toLowerCase().includes(q) ||
                        item.friendly_name.toLowerCase().includes(q)
                ).slice(0, 30);
            }
            return [];
        },
        [entities]
    );

    const renderItem = useCallback(
        ({ item }) => <EntityItem item={item} setSearchQuery={setSearchQuery} />,
        [setSearchQuery]
    );

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search Entity"
                onChangeText={text => {
                    setSearchQuery(text);
                    setShowAutocomplete(text.length > 0);
                }}
                value={searchQuery}
            />
            <FlatList
                style={styles.paragraph}
                data={showAutocomplete ? filterData(searchQuery) : entities}
                renderItem={renderItem}
                keyExtractor={item => item.entity_id}
                keyboardShouldPersistTaps="handled"
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
    },
});

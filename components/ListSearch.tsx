import { Entity } from "@/types/entities";
import { memo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { List, Searchbar, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { Routes } from "@/constants/routes";

type ListSearchProps = {
    entities: Array<Entity>,
    placeholder: string,
}

type EntityItemProps = {
    item: Entity
};

const EntityItem = memo(({ item }: EntityItemProps) => (
    <List.Item
        title={item.entity_id}
        description={item.friendly_name}
        left={() => <MaterialCommunityIcons name="play" size={24} color="black" />}
        onPress={() => {
            router.push({
                pathname: Routes.icons, params: {
                    entity_id: item.entity_id,
                    friendly_name: item.friendly_name,
                }
            });
        }}
    />
));

const ListSearch = ({ entities, placeholder }: ListSearchProps) => {
    const [filteredEntities, setFilteredEntities] = useState<Array<Entity>>();
    const [searchQuery, setSearchQuery] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    const filterData = (query: string) => {
        const q = query.toLowerCase();
        if (entities) {
            const result = entities.filter((item: Entity) =>
                item.entity_id !== undefined && item.friendly_name !== undefined &&
                (item.entity_id.includes(q) ||
                    item.friendly_name.includes(q)));
            setFilteredEntities(result);
        }
    }

    return (
        <>
            <Searchbar
                placeholder={placeholder}
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
                />
                :
                <FlatList style={styles.paragraph}
                    data={entities}
                    renderItem={({ item }) => (
                        <EntityItem item={item} />
                    )}
                    keyExtractor={item => item.entity_id}
                    keyboardShouldPersistTaps='handled'
                />

            }


        </>
    );
};

const styles = StyleSheet.create({
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




export default ListSearch;
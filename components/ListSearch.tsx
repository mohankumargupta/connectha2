import { Entity } from "@/types/entities";
import { memo, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { List, Searchbar, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { Routes } from "@/constants/routes";

export type FlatListItem = {
    key: string,
    name: string,
    icon: string,
};

export type CustomFlatListProps = {
    data: Array<FlatListItem>;
    renderItem: ListRenderItem<FlatListItem>;
};

type ListSearchProps = {
    entities: Array<FlatListItem>,
    placeholder: string,
    renderItem: ListRenderItem<FlatListItem>,
}

export type ListItemProps = {
    item: FlatListItem
};



const CustomFlatList = ({ data, renderItem }: CustomFlatListProps) => {
    return (
        <FlatList
            style={styles.paragraph}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            keyboardShouldPersistTaps='handled'
        />
    );
};


/*
const RenderEntityItem: React.FC<EntityItemProps> = ({ item, EntityItem }) => {
    return <EntityItem item={item} />;
};
*/

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

const ListSearch = ({ entities, placeholder, renderItem }: ListSearchProps) => {
    const [filteredEntities, setFilteredEntities] = useState<Array<FlatListItem>>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    const filterData = (query: string) => {
        const q = query.toLowerCase();
        if (entities) {
            const result = entities.filter((item: FlatListItem) =>
                item.key !== undefined && item.name !== undefined &&
                (item.key.includes(q) ||
                    item.name.includes(q)));
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
                <CustomFlatList data={filteredEntities} renderItem={renderItem} />
                :
                <CustomFlatList data={entities} renderItem={renderItem} />
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

/*
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

*/
import { Entity } from "@/types/entities";
import { StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import MDIGlyphMap from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
import { memo, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListSearch, { FlatListItem, ListItemProps } from "@/components/ListSearch";
import { route_options } from "@/constants/routes";

type MaterialIconName = keyof typeof MaterialCommunityIcons.glyphMap;

const icons: { [key in string]: number } = {
    ...MDIGlyphMap,
};

const iconNamesAll = Object.keys(icons);

const data = iconNamesAll.map((item: string): FlatListItem => (
    {
        key: item,
        name: item,
        icon: item,
    }
));

const EntityItem = memo(({ item, entity_id, friendly_name }: ListItemProps & { entity_id: string, friendly_name: string }) => (
    <List.Item
        title={item.key}
        description={item.name}
        left={() => <MaterialCommunityIcons name={item.key as MaterialIconName} size={24} color="black" />}
        onPress={() => {
            console.log(item.icon);
            router.push({
                pathname: route_options.customizeButton, params: {
                    icon: item.key,
                    entity_id,
                    friendly_name,
                }
            });
        }}
    />
));

/*
const renderItem = ({ item }: ListItemProps) => {
    return <EntityItem item={item} />;
};
*/

const renderItem = (entity_id: string, friendly_name: string) => ({ item }: ListItemProps) => {
    return <EntityItem item={item} entity_id={entity_id} friendly_name={friendly_name} />;
};

const IconsList = () => {
    const { entity_id, friendly_name } = useLocalSearchParams();
    const [query, setQuery] = useState('');

    useEffect(() => {
        //console.log(data);
    }, []);

    const iconNames = Object.keys(icons).filter(
        (item) =>
            item.includes(query.toLowerCase().replace(/\s/g, '-')) ||
            item.replace(/-/g, '').includes(query.toLowerCase())
    );

    const iconNamesExact = Object.keys(icons).includes(query.toLowerCase());

    return (
        <SafeAreaView style={styles.container}>
            <ListSearch entities={data} placeholder='Search Icon' renderItem={renderItem(entity_id as string, friendly_name as string)}></ListSearch>
        </SafeAreaView>
    );
};

export default IconsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        marginTop: 40,
    },
});

/*
<ListSearch entities={iconNames} placeholder='Search Entities' renderItem={renderItem}></ListSearch>
*/
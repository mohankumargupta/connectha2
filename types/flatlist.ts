import { ListRenderItem } from "react-native";

export type FlatListItem = {
    key: string,
    name: string,
    icon: string,
};

export type CustomFlatListProps = {
    data: Array<FlatListItem>;
    renderItem: ListRenderItem<FlatListItem>;
};
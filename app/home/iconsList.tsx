import { Entity } from "@/types/entities";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const IconsList = () => {
    const { entity_id, friendly_name } = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.container}>
            <Text>{entity_id}</Text>
            <Text>{friendly_name}</Text>
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

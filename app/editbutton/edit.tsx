import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Avatar, Button, SegmentedButtons, Switch, TextInput } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { route_options } from '@/constants/routes';
import { AuthData, convertToValidKeyName } from '@/constants/AuthData';
import { getItem, saveItem } from '../auth';

type MaterialIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function CustomizeButton() {
    const [value, setValue] = useState('toggle');
    const { icon, entity_id, friendly_name } = useLocalSearchParams<{ icon: string, entity_id: string, friendly_name: string }>();
    const [live, setLive] = useState(true);
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        if (friendly_name)
            setDisplayName(friendly_name);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headingCentered}>Preview</Text>
            <Avatar.Icon style={styles.icon} icon={icon as MaterialIconName} size={196} color="white" />
            <Text style={styles.displayName}>{friendly_name}</Text>
            <Text style={styles.heading}>Display Name</Text>
            <TextInput
                value={displayName}
                onChangeText={val => setDisplayName(val)}
            />
            <Text style={styles.heading}>Live Updates</Text>

            <View style={styles.switch}>
                <Switch
                    value={live}
                    onValueChange={(val) => setLive(val)}
                />
            </View>
            <Button
                mode="contained"
                style={styles.button}
                onPress={async e => {
                    console.log(`entityid: ${entity_id}`);
                    console.log(`name: ${friendly_name}`);
                    console.log(`action: ${value}`);
                    console.log(`icon: ${icon}`);
                    console.log(`live: ${entity_id}`);
                    console.log(`displayName: ${entity_id}`);
                    await AsyncStorage.setItem("entity_id", entity_id as string);
                    await AsyncStorage.setItem("friendly_name", friendly_name as string);
                    await AsyncStorage.setItem("action", value);
                    await AsyncStorage.setItem("icon", icon as string);
                    await AsyncStorage.setItem("live", live.toString());
                    await AsyncStorage.setItem("displayName", displayName);
                    const ha_url = await getItem(AuthData.ha_url);
                    const entity_data = {
                        "entity_id": entity_id as string,
                        "friendly_name": friendly_name as string,
                        "action": value,
                        "icon": icon as string,
                        "live": live.toString(),
                        "displayName": displayName,
                    };
                    const stringified = JSON.stringify(entity_data);
                    if (ha_url)
                        await AsyncStorage.setItem(convertToValidKeyName(ha_url), stringified);
                    router.push({
                        pathname: route_options.home,
                        params: {
                            entity_id,
                            friendly_name,
                            value,
                            icon
                        }
                    });
                }}
            >Save</Button>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        margin: 24,
    },
    headingCentered: {
        marginVertical: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    heading: {
        marginVertical: 24,
        fontSize: 18,
        fontWeight: 'bold',
    },
    normal: {
        textAlign: 'center',
        marginHorizontal: 8,
    },
    icon: {
        backgroundColor: "#2196f3",
        alignSelf: "center",
    },
    button: {
        marginVertical: 48,
    },
    switch: {
        alignItems: 'flex-start',     // Center horizontally
    },
    displayName: {
        fontFamily: "WorkSans_400Regular",
        fontSize: 32,
        marginTop: 12,
        marginBottom: 36,
        alignSelf: 'center'
    },
});

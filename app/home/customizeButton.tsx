import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Avatar, Button, SegmentedButtons, Switch, TextInput } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routes } from '@/constants/routes';

type MaterialIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function CustomizeButton() {
    const [value, setValue] = useState('toggle');
    const { icon, entity_id, friendly_name } = useLocalSearchParams<{ icon: string, entity_id: string, friendly_name: string }>();
    const [live, setLive] = useState(true);
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        setDisplayName(displayName);
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
                    await AsyncStorage.setItem("entity_id", entity_id as string);
                    await AsyncStorage.setItem("friendly_name", friendly_name as string);
                    await AsyncStorage.setItem("action", value);
                    await AsyncStorage.setItem("icon", icon as string);
                    await AsyncStorage.setItem("live", live.toString());
                    await AsyncStorage.setItem("displayName", displayName);
                    router.push({
                        pathname: Routes.home,
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

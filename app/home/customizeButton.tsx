import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { Avatar, Button, SegmentedButtons } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type MaterialIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function CustomizeButton() {

    const [value, setValue] = useState('toggle');
    const { icon } = useLocalSearchParams();

    useEffect(() => {
        //console.log(icon);
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.paragraph}>Preview</Text>
            <Text style={styles.normal}>Garage door</Text>
            <Avatar.Icon style={styles.icon} icon={icon as MaterialIconName} size={196} color="white" />

            <Text style={styles.paragraph}>Action</Text>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: 'toggle',
                        label: 'Toggle',
                    },
                    {
                        value: 'on',
                        label: 'Turn On',
                    },
                    { value: 'off', label: 'Turn Off' },
                ]}
            />
            <Button
                mode="contained"
                style={styles.button}
                onPress={e => console.log("boo")}
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
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    normal: {
        textAlign: 'center',
        marginBottom: 8,
    },
    icon: {
        backgroundColor: "#2196f3",
        alignSelf: "center",
    },
    button: {
        marginTop: 24,
    }
});

import { useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthRequest, DiscoveryDocument } from 'expo-auth-session';
import { AuthClient } from "@/constants/AuthData";

type HomeAssistantURL = {
    url: string
};

const connect_login = (({ url: data }: HomeAssistantURL) => {
    const authSession = new AuthRequest({
        clientId: AuthClient.client_id,
        redirectUri: AuthClient.redirect_uri,
        state: data,
    });

    const discovery: DiscoveryDocument = {
        authorizationEndpoint: `${data}/auth/authorize`,
        tokenEndpoint: `${data}/auth/token`,
    };

    authSession.promptAsync(discovery);
});


export default function Connect() {
    const { url } = useLocalSearchParams<{ url: string }>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text>{url}</Text>
                <View style={styles.button}>
                    <Button
                        title="Connect"

                    />
                </View>
                <View style={styles.button}>
                    <Button title="Connect Permanently" />
                </View>
            </View>
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexBasis: 0,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#dad7cd',
        marginTop: 36,
    },
    wrapper: {
        margin: 36,

    },
    button: {
        marginTop: 24,
    },
});
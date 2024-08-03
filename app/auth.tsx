import * as AuthSession from 'expo-auth-session';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { AuthData } from '@/constants/AuthData';
import { useWebsocketManager } from '@/stores/websocket';
import { route_options } from '@/constants/routes';

async function saveItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

async function save(haUrl: string, token: AuthSession.TokenResponse) {
    await saveItem(AuthData.ha_url, haUrl);
    await saveItem(AuthData.access_token, token.accessToken);
    await saveItem(AuthData.refresh_token, token.refreshToken!);
}

export default function auth() {
    const params = useLocalSearchParams<{ code: string, state: string }>();
    const code = params.code;
    const state = params.state;

    const HOMEASSISTANT_CLIENTID = "https://mohankumargupta.github.io";
    const HOMEASSISTANT_REDIRECT_URI = "https://mohankumargupta.github.io/redirect/bigbutton.html";

    const connect = useWebsocketManager((state) => state.connect);

    useEffect(() => {
        async function exchange_token() {
            if (code == null) {
                router.replace(route_options.findha);
                return;
            }

            const tokenResponse = await AuthSession.exchangeCodeAsync({
                clientId: HOMEASSISTANT_CLIENTID,
                redirectUri: HOMEASSISTANT_REDIRECT_URI,
                code: code
            }, {
                tokenEndpoint: `${state}/auth/token`,
            });

            if (state) {
                await save(state, tokenResponse);
                connect(state, tokenResponse.accessToken);
                router.replace(route_options.entitiesList);
            }

            else {
                router.replace(route_options.findha);
            }
        }
        console.log("inside auth");
        exchange_token();
    }, []);

    return (
        <SafeAreaView>
            <></>
        </SafeAreaView>
    )
}

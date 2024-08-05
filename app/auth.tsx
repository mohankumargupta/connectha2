import * as AuthSession from 'expo-auth-session';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { AuthData, TokenSecret, convertToValidKeyName } from '@/constants/AuthData';
import { useWebsocketManager } from '@/stores/websocket';
import { route_options } from '@/constants/routes';

async function hasKey(key: string) {
    const validKey = convertToValidKeyName(key);
    const value = await SecureStore.getItemAsync(validKey);
    return value !== null;
}

async function getItem(key: string) {
    return await SecureStore.getItemAsync(key);
}

async function saveItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

async function save(haUrl: string, token: AuthSession.TokenResponse) {
    await saveItem(AuthData.ha_url, haUrl);
    await saveItem(AuthData.access_token, token.accessToken);
    await saveItem(AuthData.refresh_token, token.refreshToken!);

    const secret: TokenSecret = {
        'access_token': token.accessToken,
        "refresh_token": token.refreshToken!,
    };

    const servers = await getItem(AuthData.ha_server_list);
    const newKey = convertToValidKeyName(haUrl);
    if (servers === null) {
        console.log("servers is null");
        console.log(haUrl);

        console.log(newKey);
        await saveItem(newKey, JSON.stringify(secret));
    }
    else {
        console.log(servers);
        let pastServers = JSON.parse(servers) as TokenSecret[];
        pastServers.push(secret);
        await saveItem(newKey, JSON.stringify(secret));

    }




    //await saveItem(convertToValidKeyName(haUrl), JSON.stringify(secret));
    //console.log(servers);
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

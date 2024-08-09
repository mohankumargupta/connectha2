import * as AuthSession from 'expo-auth-session';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { AuthData, TokenSecret, convertToValidKeyName } from '@/constants/AuthData';
import { useWebsocketManager } from '@/stores/websocket';
import { route_options } from '@/constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function hasKey(key: string) {
    const validKey = convertToValidKeyName(key);
    const value = await SecureStore.getItemAsync(validKey);
    return value !== null;
}

export async function getItem(key: string) {
    return await SecureStore.getItemAsync(key);
}

export async function saveItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

async function save(haUrl: string, token: AuthSession.TokenResponse) {
    //await saveItem(AuthData.ha_url, haUrl);
    await AsyncStorage.setItem(AuthData.ha_url, haUrl);
    //await saveItem(AuthData.access_token, token.accessToken);
    await saveItem(AuthData.refresh_token, token.refreshToken!);

    const secret: TokenSecret = {
        "refresh_token": token.refreshToken!,
        "longlived_token": null,
    };

    const servers = await getItem(AuthData.ha_server_list);
    const newKey = convertToValidKeyName(haUrl);
    if (servers === null) {
        console.log("servers is null");
        console.log(haUrl);

        console.log(newKey);
        await saveItem(newKey, JSON.stringify(secret));
        await saveItem(AuthData.ha_server_list, JSON.stringify([haUrl]));
    }
    else {
        console.log(servers);
        let pastServers = JSON.parse(servers) as string[];
        pastServers.push(haUrl);
        await saveItem(newKey, JSON.stringify(secret));
        await saveItem(AuthData.ha_server_list, JSON.stringify(pastServers));
    }
}

export default function auth() {
    const params = useLocalSearchParams<{ code: string, state: string }>();
    const code = params.code;
    const haUrl = params.state;

    const HOMEASSISTANT_CLIENTID = "https://mohankumargupta.github.io";
    const HOMEASSISTANT_REDIRECT_URI = "https://mohankumargupta.github.io/redirect/bigbutton.html";

    const websocket_init = useWebsocketManager((i) => i.init);
    const websocket_connect = useWebsocketManager((i) => i.connect);


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
                tokenEndpoint: `${haUrl}/auth/token`,
            });

            //console.log("going to entitiesList");
            console.log(tokenResponse);
            console.log(haUrl);

            if (haUrl && tokenResponse.accessToken) {
                console.log("going to entitiesList before save");
                //await save(state,);
                //connect(state, tokenResponse.accessToken);
                websocket_init(haUrl, tokenResponse.accessToken);
                websocket_connect();

                console.log("really going now.");
                setTimeout(() => {
                    router.replace(route_options.entitiesList);
                }, 2000);

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
            <><Text>Boo</Text></>
        </SafeAreaView>
    )
}

import { AuthData } from '@/constants/AuthData';
import { useNavigation, useGlobalSearchParams, Redirect, router } from 'expo-router';
//import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { websocketconnect } from './common/websocketconnect';
import { useWebsocketManager } from '@/stores/websocket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const route_options = {
  pending: 'pending',
  login: 'login',
  configure: 'configure',
  home: 'home'
} as const;

type RouteDestination = keyof typeof route_options;

export default function index() {
  const [access_token, setAccessToken] = useState<string | undefined>(undefined);
  const connect = useWebsocketManager((state) => state.connect);
  const [destination, setDestination] = useState<RouteDestination>("pending");

  async function get_value_from_store(key: string): Promise<string | null> {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  async function saveItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  async function previous_login() {
    const refresh_token = await get_value_from_store(AuthData.refresh_token);
    const ha_url = await get_value_from_store(AuthData.ha_url);

    console.log(refresh_token);
    console.log(ha_url);

    if (!refresh_token || !ha_url) {
      console.log("either refresh_token and ha_url empty");
      setTimeout(() => { SplashScreen.hideAsync(); }, 300);
      setDestination('login');
    }

    if (refresh_token && ha_url) {
      try {
        const tokenResult = await AuthSession.refreshAsync({
          clientId: "https://mohankumargupta.github.io",
          refreshToken: refresh_token,
        }, {
          tokenEndpoint: `${ha_url}/auth/token`,
        },
        );

        if (tokenResult && tokenResult.accessToken) {
          await saveItem(AuthData.access_token, tokenResult.accessToken);
          connect(ha_url, tokenResult.accessToken);

          const entity_id = await AsyncStorage.getItem("entity_id");
          const name = await AsyncStorage.getItem("friendly_name");
          const action = await AsyncStorage.getItem("action");
          const icon = await AsyncStorage.getItem("icon");

          if (entity_id && name && action && icon) {
            setTimeout(() => { SplashScreen.hideAsync(); }, 300);
            setDestination('home');
          }

          else {
            setTimeout(() => { SplashScreen.hideAsync(); }, 300);
            setDestination('configure');
          }
        }
      }

      catch (error) {
        setTimeout(() => { SplashScreen.hideAsync(); }, 300);
        setDestination('login');
      }
    }
  }

  useEffect(() => {
    previous_login();
  }, []);

  switch (destination) {
    case 'pending':
      return (
        <View style={{ flex: 1, backgroundColor: "#344E41" }}>

        </View>
      );
      break;
    case 'login':
      return (
        <Redirect href="/login"></Redirect>
      );
      break;
    case 'configure':
      return (
        <Redirect href="/home/entitiesList"></Redirect>
      );
      break;
    case 'home':
      return (
        <Redirect href="/home"></Redirect>
      );
      break;
  }
}





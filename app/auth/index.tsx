import * as AuthSession from 'expo-auth-session';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';
import { AuthData } from '@/constants/AuthData';

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

  useEffect(() => {
    async function exchange_token() {
      if (code == null) return;

      const tokenResponse = await AuthSession.exchangeCodeAsync({
        clientId: HOMEASSISTANT_CLIENTID,
        redirectUri: HOMEASSISTANT_REDIRECT_URI,
        code: code
      }, {
        tokenEndpoint: `${state}/auth/token`,
      });
      //console.log("------------AUTH---------");
      //console.log(tokenResponse);
      if (state) {
        await save(state, tokenResponse);
        router.replace("/home/entitiesList")
      }
    }
    exchange_token();
  }, []);

  /*
  if (code !=null) {
    const access_token_request =new AccessTokenRequest({
      clientId: HOMEASSISTANT_CLIENTID,
      redirectUri: HOMEASSISTANT_REDIRECT_URI,
      code: code
    });
    
  }
  */





  /*
  fetch(`${state}`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },    
    body: new URLSearchParams({
        'userName': 'test@gmail.com',
        'password': 'Password!',
        'grant_type': 'password'
    })
  });
  */





  return (
    <></>
  )
}

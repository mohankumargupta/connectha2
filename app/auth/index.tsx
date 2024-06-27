import * as AuthSession from 'expo-auth-session';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function auth() {
  const params = useLocalSearchParams<{code: string, state: string}>();
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
      },{
        tokenEndpoint: `${state}/auth/token`,
      });
      console.log(tokenResponse);
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
    <SafeAreaView>
      <Text>Auth</Text>
    </SafeAreaView>
  )
}
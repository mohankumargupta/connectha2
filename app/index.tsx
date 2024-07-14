import { AuthData } from '@/constants/AuthData';
import { useNavigation, useGlobalSearchParams, Redirect, router } from 'expo-router';
//import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { websocketconnect } from './common/websocketconnect';
import { useWebsocketManager } from '@/stores/websocket';

//WebBrowser.maybeCompleteAuthSession();

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

/*
type HomeAssistantURL = {
  url: string
};
*/

export default function index() {

  const [access_token, setAccessToken] = useState<string | undefined>(undefined);
  const [valid, setValid] = useState<boolean | undefined>(undefined);
  const connect = useWebsocketManager((state) => state.connect);

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
    if (refresh_token && ha_url) {
      //console.log("refresh token:", refresh_token);
      //console.log("ha_url", ha_url);

      if (refresh_token === null || ha_url === null) {
        setValid(false);
      }

      try {
        const tokenResult = await AuthSession.refreshAsync({
          clientId: "https://mohankumargupta.github.io",
          refreshToken: refresh_token,
        }, {
          tokenEndpoint: `${ha_url}/auth/token`,
        },
        );
        //console.log(tokenResult);

        if (tokenResult && tokenResult.accessToken) {
          await saveItem(AuthData.access_token, tokenResult.accessToken);
          //let boo = await get_value_from_store(AuthData.access_token);
          //console.log("access token from store: ", boo);
          connect(ha_url, tokenResult.accessToken);
          setValid(true);
        }
      }

      catch (error) {
        setValid(false);
      }
    }
    else {
      setValid(false);
    }

  }

  useEffect(() => {
    previous_login();
    // Call the function when the component mounts
    //get_value_from_store(AuthData.refresh_token);
    //get_value_from_store(AuthData.ha_url);

  }, []);


  /*
  return (
    <></>
  );
  */


  if (valid === undefined) {
    return <></>
  }
  else if (valid) {
    return (
      <Redirect href="/home/entitiesList"></Redirect>
    );
  }

  else {
    return (
      <Redirect href="/login"></Redirect>
    );
  }

}


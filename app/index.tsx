import { AuthData } from '@/constants/AuthData';
import { useNavigation, useGlobalSearchParams, Redirect, router } from 'expo-router';
//import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

//WebBrowser.maybeCompleteAuthSession();

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

type HomeAssistantURL = {
  url: string
};


export default function index() {

  const [access_token, setAccessToken] = useState<string|undefined>(undefined);
  const [validtoken, setValidToken] = useState<boolean|undefined>(undefined);
  const [url, setURL] = useState<string|undefined>(undefined);
  const [valid, setValid] = useState<boolean|undefined>(undefined);

  async function get_value_from_store(key: string) {
    let result = await SecureStore.getItemAsync(key);


    console.log(result);
    if (result) {
      setValidToken(true);
    }
  }
  
  async function previous_login() {
    await get_value_from_store(AuthData.refresh_token);
    await get_value_from_store(AuthData.ha_url);
    if (validtoken && url) {
    /*
const tokenResult = await AuthSession.refreshAsync({
          clientId: "https://mohankumargupta.github.io",
          refreshToken: refresh_token,
        }, {
          tokenEndpoint: ha_url,
        },
      );
    */
    }
    else {

    }

  }

  useEffect(() => {
    previous_login();
    // Call the function when the component mounts
    //get_value_from_store(AuthData.refresh_token);
    //get_value_from_store(AuthData.ha_url);

  }, []);

  if (valid === undefined) {
    return <></>
  }
  else if (validtoken === true) {
    return (
      <Redirect href="/home/settings"></Redirect>
    );
  }

  else {
    return (
      <Redirect href="/login"></Redirect>
    );
  }
}


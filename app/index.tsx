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

  async function get_value_from_store(key: string) {
    let result = await SecureStore.getItemAsync(key);
    console.log(result);
    if (result) {
      setValidToken(true);
    }
  }
  
  useEffect(() => {
    // Call the function when the component mounts
    get_value_from_store('accessToken');
  }, []);

  if (validtoken === undefined) {
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


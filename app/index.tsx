import { useNavigation, useGlobalSearchParams, Redirect, router } from 'expo-router';
import 'react-native-reanimated';

//WebBrowser.maybeCompleteAuthSession();

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

type HomeAssistantURL = {
  url: string
};

export default function index() {

  return (
    <Redirect href="/login"></Redirect>
  );
}


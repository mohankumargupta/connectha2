import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';

async function getValue(key: string) {
  let result = await SecureStore.getItemAsync(key);
  console.log(`${key}: ${result}`);
  return result;
}

export default function home() {

  useEffect(() => {
    async function load() {
      const access_token = await getValue("accessToken");
      const refrsh_token = await getValue("refreshToken");
      const ha_url = await getValue("haUrl");
    }

    load();

  }, []);

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}
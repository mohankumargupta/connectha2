import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';
import { PaperProvider } from 'react-native-paper';

async function getValue(key: string) {
  let result = await SecureStore.getItemAsync(key);
  console.log(`${key}: ${result}`);
  return result;
}

export default function home() {

  useEffect(() => {
  }, []);

  return (
    <PaperProvider>
       <Text>Home</Text>
    </PaperProvider>
  )
}
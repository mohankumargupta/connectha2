import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function auth() {
  const params = useLocalSearchParams<{code: string, state: string}>();
  

  /*
  fetch('', {
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

  console.log(params.code);
  console.log(params.state);

  return (
    <SafeAreaView>
      <Text>Auth</Text>
    </SafeAreaView>
  )
}
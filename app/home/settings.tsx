import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';
import { PaperProvider } from 'react-native-paper';
import IconsList from './iconsList';

async function getValue(key: string) {
  let result = await SecureStore.getItemAsync(key);
  console.log(`${key}: ${result}`);
  return result;
}

export default function settings() {

  useEffect(() => {
    async function load() {
      const access_token = await getValue("accessToken");
      const refrsh_token = await getValue("refreshToken");
      const ha_url = await getValue("haUrl");
      const websocket_url = `${ha_url}/api/websocket`;
      console.log(websocket_url);
      const ws = new WebSocket(websocket_url);
      ws.onopen = () => {
        // connection opened
        ws.send(JSON.stringify({
          "type": "auth",
          "access_token": access_token
        }));

        ws.send(JSON.stringify({
          "id": 1,
          "type": "get_states"
        }));
      };
      
      ws.onmessage = e => {
        // a message was received
        console.log(e.data);
      };
      
      ws.onerror = e => {
        // an error occurred
        console.log(e);
      };
      
      ws.onclose = e => {
        // connection closed
        console.log(e.code, e.reason);
      };

    }

    load();

  }, []);

  return (
    <PaperProvider>
        <View style={styles.container}>
          <Text>Add Button</Text>
          <IconsList/>
      </View>
    </PaperProvider>
  )
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 150,
    paddingHorizontal: 50,
    //marginVertical: 50,
    justifyContent: "center",
    rowGap: 32
  },


});
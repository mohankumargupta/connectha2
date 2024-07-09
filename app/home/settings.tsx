import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';
import { Button, PaperProvider } from 'react-native-paper';
import IconsList from './iconsList';
import { router } from 'expo-router';
import { useWebsocketManager } from '@/stores/websocket';
import { MessageBase, states } from '@/types/messages'; 

async function getValue(key: string) {
  let result = await SecureStore.getItemAsync(key);
  console.log(`${key}: ${result}`);
  return result;
}

export default function settings() {
  const connect = useWebsocketManager((state) => state.connect);
  const sendMessage = useWebsocketManager((state) => state.sendMessage);

  useEffect(() => {
    async function load() {
      const access_token = await getValue("accessToken");
      const refresh_token = await getValue("refreshToken");
      const ha_url = await getValue("haUrl");
      const websocket_url = `${ha_url}/api/websocket`;
      console.log(websocket_url);
      if (access_token) {
        connect(websocket_url, access_token);
      }
      /*
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

      */

    }

    load();

  }, []);

  return (
    <PaperProvider>
        <View style={styles.container}>
          <Text>Add Button</Text>
          <IconsList/>
          <Button
            onPress={()=> {
               router.navigate("/home");
            }}
       >Save</Button>
      </View>
    </PaperProvider>
  )
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 50,
    //marginVertical: 50,
    justifyContent: "center",
    rowGap: 32,
    columnGap: 32,
  },


});
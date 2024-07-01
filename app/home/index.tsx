import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { Avatar, PaperProvider } from 'react-native-paper';
import {useHAButtonState} from '@/components/AppState';

async function getValue(key: string) {
  let result = await SecureStore.getItemAsync(key);
  console.log(`${key}: ${result}`);
  return result;
}

export default function home() {
  const icon = useHAButtonState((state) => state.icon);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => console.log("pressed")}>
         <Avatar.Icon style={styles.icon} icon={icon} size={196} color="white"/>
         </TouchableOpacity>
         <Text>script.moo</Text>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    backgroundColor: "#2196f3"
  }

});
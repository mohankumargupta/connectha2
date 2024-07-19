import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { Avatar, FAB, PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Routes } from '@/constants/routes';

async function getValue(key: string) {
  let result = await SecureStore.getItemAsync(key);
  console.log(`${key}: ${result}`);
  return result;
}

type HAButton = {
  entity_id: string,
  name: string,
  action: string,
  icon: string,
};



export default function home() {
  const [habutton, setHAbutton] = useState<HAButton>();

  async function load() {
    const entity_id = await AsyncStorage.getItem("entity_id");
    const name = await AsyncStorage.getItem("friendly_name");
    const action = await AsyncStorage.getItem("action");
    const icon = await AsyncStorage.getItem("icon");
    if (entity_id && name && action && icon) {
      setHAbutton({
        entity_id,
        name,
        action,
        icon
      });
    }

  }

  useEffect(() => {
    load();
  });

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>{habutton?.name}</Text>
        <TouchableOpacity onPress={() => console.log("pressed")}>
          <Avatar.Icon style={styles.icon} icon={habutton?.icon as string} size={196} color="white" />
        </TouchableOpacity>
        <Text>{habutton?.entity_id}</Text>
        <FAB
          style={styles.fab}
          icon="pencil"
          onPress={() => {
            router.navigate(Routes.entities);
          }}
        />
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
  },
  fab: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    margin: 16,
  },
});
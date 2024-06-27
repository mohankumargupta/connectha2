import { Stack } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'

export default function home() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}></Stack>
  )
}
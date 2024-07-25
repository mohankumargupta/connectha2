//import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
//import { useFonts } from 'expo-font';
//import { useNavigation, useGlobalSearchParams } from 'expo-router';
//import * as SplashScreen from 'expo-splash-screen';
//import { useEffect } from 'react';
import 'react-native-reanimated';

//import { useColorScheme } from '@/hooks/useColorScheme';
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthRequest, DiscoveryDocument } from 'expo-auth-session';
import { useCallback, useEffect } from 'react';

import { configureDiscovery, startDiscovery } from '@/modules/nsd';


// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

type HomeAssistantURL = {
  url: string
};

const HOMEASSISTANT_CLIENTID = "https://mohankumargupta.github.io";
const HOMEASSISTANT_REDIRECT_URI = "https://mohankumargupta.github.io/redirect/bigbutton.html";

export default function index() {

  //const navigation = useNavigation()
  //const globalParams = useGlobalSearchParams();
  //console.log(JSON.stringify(navigation.getState()))
  //console.log(JSON.stringify(globalParams));

  const schema = z.object({
    url: z.string({ required_error: "required", message: "moomoo" }).url({ message: "url not ok. Must start with http:// or https://" }),
  });

  type Schema = z.infer<typeof schema>

  const { control, handleSubmit, formState: { errors } } = useForm<Schema>(
    {
      resolver: zodResolver(schema)
    }
  );

  const submit = handleSubmit(({ url: data }: HomeAssistantURL) => {
    //console.log(data);
    if (errors.url) {
      return;
    }
    const authSession = new AuthRequest({
      clientId: HOMEASSISTANT_CLIENTID,
      redirectUri: HOMEASSISTANT_REDIRECT_URI,
      state: data,
    });

    const discovery: DiscoveryDocument = {
      authorizationEndpoint: `${data}/auth/authorize`,
      tokenEndpoint: `${data}/auth/token`,
    };

    authSession.promptAsync(discovery);
  });

  useEffect(() => {
    const sub = configureDiscovery("_http._tcp", (service) => {
      console.log(service);
    })

    startDiscovery();
    return () => sub.remove();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.heading}>Connect Home Assistant</Text>
        <Controller
          name="url"
          control={control}
          defaultValue='http://192.168.20.98:8123'
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                label="Home Assistant URL"
                //onChange={onChange}
                onChangeText={onChange}
                value={value}
              //left={<TextInput.Affix text="http://" />}
              >
              </TextInput>
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        >
        </Controller>


        <Button style={styles.button} mode='contained' onPress={() => {
          submit();
        }}>
          Connect
        </Button>
      </View>
    </PaperProvider>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingVertical: 50,
    paddingHorizontal: 50,
    justifyContent: "center",
    rowGap: 32
  },

  heading: {
    //marginVertical: 50,
    fontSize: 24,
    //marginBottom: 8
  },
  button: {
    marginVertical: 8
  },
  error: {
    color: "red"
  }

});
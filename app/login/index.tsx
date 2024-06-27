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
import {AuthRequest, DiscoveryDocument} from 'expo-auth-session';

//import * as WebBrowser from 'expo-web-browser';
//import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

//WebBrowser.maybeCompleteAuthSession();

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

type HomeAssistantURL = {
  url: string
};

const HOMEASSISTANT_CLIENTID = "https://mohankumargupta.github.io";
const HOMEASSISTANT_REDIRECT_URI = "https://mohankumargupta.github.io/redirect/bigbutton.html";

/*
const schema = z.object({
  homeassistant: z.string({required_error: "required", message: "moo"}),
});
*/

//type Schema = z.infer<typeof schema>

export default function index() {

  //const navigation = useNavigation()
  //const globalParams = useGlobalSearchParams();
  //console.log(JSON.stringify(navigation.getState()))
  //console.log(JSON.stringify(globalParams));
  /*  
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  */
  /*
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  */

    /*
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<Schema>({
      defaultValues: {
        homeassistant: ""
      },
      //resolver: zodResolver(schema),
    });
    */

    /*
    const discovery = {
      authorizationEndpoint: 'http://192.168.20.98:8123/auth/authorize',
      tokenEndpoint: 'http://192.168.20.98:8123/auth/authorize',
    };

    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: 'https://mohankumargupta.github.io',
        redirectUri: "https://mohankumargupta.github.io/redirect/bigbutton.html"
      },
      discovery
    );
    */  

  const schema = z.object({
    url: z.string({required_error: "required", message: "moomoo"}).url({message: "url not ok. Must start with http:// or https://"}),
  });


  type Schema = z.infer<typeof schema>

  const { control, handleSubmit, formState: {errors} } = useForm<Schema>(
    {
      resolver: zodResolver(schema)
    }
  );  

  const submit = handleSubmit(({url: data}:HomeAssistantURL) => {
    console.log(data);
    if (errors.url) {
      return;
    }
    const authSession = new AuthRequest({
      clientId: HOMEASSISTANT_CLIENTID,
      redirectUri: HOMEASSISTANT_REDIRECT_URI,
    });      

    const discovery: DiscoveryDocument = {
      authorizationEndpoint: `${data}/auth/authorize`,
      tokenEndpoint: `${data}/auth/token`,
    };

    authSession.promptAsync(discovery);
  });

  return (
      <PaperProvider>
        <View style={styles.container}>
          <Text style={styles.heading}>Connect To Home Assistant</Text>
          
          <Controller 
             name = "url"
             control={control}
             rules={{
              required: true,
            }}
            render={({field: {onChange, value}, fieldState: {error}} ) => (
              <>
              <TextInput 
                label="Home Assistant URL"
                //onChange={onChange}
                onChangeText={onChange}
                value={value}
              >
              </TextInput>
              {error && <Text style={styles.error}>{error.message}</Text>}
              </>        
            )}             
          >
          </Controller>
          
          
          <Button style={styles.button}   mode='contained' onPress={()=>{
    /*
    const discovery = {
      authorizationEndpoint: 'http://192.168.20.98:8123/auth/authorize',
      tokenEndpoint: 'http://192.168.20.98:8123/auth/authorize',
    };

    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: 'https://mohankumargupta.github.io',
        redirectUri: "https://mohankumargupta.github.io/redirect/bigbutton.html"
      },
      discovery
    );
    */   
            
            //console.log("boo");
            submit();
          }}>
            Connect
          </Button>
        </View>
      </PaperProvider>
    );
  

}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    //paddingVertical: 50,
    paddingHorizontal: 50,
    justifyContent: "center",
    rowGap: 32
  },

   heading: {
    //marginVertical: 50,
    fontSize: 32,
    //marginBottom: 8
   },
   button: {
    //marginVertical: 8
  },
  error: {
    color: "red"
  }

});
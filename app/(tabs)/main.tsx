import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { Avatar, FAB, PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';
import { route_options } from '@/constants/routes';
import { useWebsocketManager } from '@/stores/websocket';
import { callService, states, subscribe_trigger } from '@/types/messages';
import { AuthData, convertToValidKeyName } from '@/constants/AuthData';
import { EntityFromHA } from '@/types/entities';

type HAButton = {
    entity_id: string,
    name: string,
    action: string,
    icon: string,
};

export default function main() {
    const [habutton, setHAbutton] = useState<HAButton>();
    const navigation = useNavigation();
    const isFocused = navigation.isFocused;
    const sendMessage = useWebsocketManager((state) => state.sendMessage);
    const sendMessageTrigger = useWebsocketManager((state) => state.sendMessageTrigger);
    //const unsubscribe = useWebsocketManager((state) => state.unsubscribe);
    //const subscribe = useWebsocketManager((state) => state.subscribe);
    const [onOff, setOnOff] = useState(false);

    async function load() {
        const ha_url = await AsyncStorage.getItem(AuthData.ha_url);
        console.log(`ha_url from AsyncStorage: ${ha_url}`);
        const buttonDetails = await AsyncStorage.getItem(convertToValidKeyName(ha_url!));
        console.log(buttonDetails);
        const entity_id = await AsyncStorage.getItem("entity_id");
        const name = await AsyncStorage.getItem("friendly_name");
        const action = await AsyncStorage.getItem("action");
        const icon = await AsyncStorage.getItem("icon");
        const live = await AsyncStorage.getItem("live");
        const displayName = await AsyncStorage.getItem("displayName");

        console.log(live);

        if (entity_id && name && icon) {
            setHAbutton({
                entity_id,
                name: displayName ?? name,
                action: "toggle",
                icon
            });
            if (live?.toLocaleLowerCase() === "true") {
                /*
                subscribe(event => {
                    const data = JSON.parse(event.data);
                    if (data.event) {
                        if (data.event.variables.trigger.entity_id === entity_id) {
                            const liveState = data.event.variables.trigger.to_state.state;
                            if (liveState === "on") {
                                setOnOff(true);
                            }
                            else {
                                setOnOff(false);
                            }
                            //console.log(data.event.variables.trigger.to_state.state);
                        }
                    }
                });
                */
            }

            //sendMessage(subscribe_trigger(entity_id), event => {
            //    const message = JSON.parse(event.data);
            //    console.log(message);
            //});

            const id = sendMessage(states(), (event) => {
                console.log("it works in main.tsx!!!");
                const message = JSON.parse(event.data);
                //console.log(message);
                const data = message.result;
                if ("id" in message && message.id === id) {
                    const found = data.find((obj: EntityFromHA) => obj.entity_id === entity_id);
                    console.log(found);
                    if (found.state === "off") {
                        //console.log("turning off");
                        setOnOff(false);
                    }
                    if (found.state === "on") {
                        //console.log("turning off");
                        setOnOff(true);
                    }

                }
            });
            sendMessageTrigger(entity_id, event => {
                const message = JSON.parse(event.data);
                const isOn = message.event.variables.trigger.to_state.state;
                //console.log(message.event.variables.trigger.to_state.state);
                isOn === "on" ? setOnOff(true) : setOnOff(false);
                console.log("main.tsx:sendmessagetrigger");
            });


        }
    }

    useEffect(() => {
        //load();
    }, []);

    useEffect(() => {
        load();
        return () => {
            console.log("lost focus in entitieslist");
            //unsubscribe();
        };
    }, [isFocused]);

    return (
        <PaperProvider>
            <View style={styles.container}>
                <TouchableOpacity onPress={async () => {
                    const action = await AsyncStorage.getItem("action");
                    sendMessage(callService("homeassistant", habutton?.action as string, undefined, { entity_id: habutton?.entity_id }), event => { });
                }}>
                    <Avatar.Icon
                        style={styles.icon}
                        icon={habutton?.icon as string}
                        size={196}
                        color={onOff ? "yellow" : "white"}
                    />
                </TouchableOpacity>
                <Text style={styles.entityname}>{habutton?.name}</Text>
                <FAB
                    style={styles.fab}
                    icon="pencil"
                    onPress={() => {
                        router.navigate({
                            pathname: route_options.entitiesList, params: {
                                previousRoute: route_options.home,
                            }
                        });
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
        margin: 64,
    },
    entityname: {
        fontFamily: "WorkSans_400Regular",
        fontSize: 32,
        marginVertical: 32,
    },
});
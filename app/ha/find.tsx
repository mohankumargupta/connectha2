import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
    Image,

} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
//import { configureDiscovery, startDiscovery, Service } from '@/modules/nsd';
import { router } from 'expo-router';
import { route_options } from '@/constants/routes';
//import { hello } from '@/modules/exponsd';

type Service = {
    address: string,
    port: number,
    name: string
};


export default function Example() {
    const [form, setForm] = useState({
        emailNotifications: true,
        pushNotifications: false,
    });
    const [urlScheme, setUrlScheme] = useState('http');
    const [ha, setHA] = useState('')
    const [services, SetServices] = useState<Array<Service>>([]);
    const [greeting, setGreeting] = useState('');
    /*
    const services: Array<Service> = [
        {
            name: "Home",
            address: "192.168.20.98",
            port: 8123,
        }
    ];
    */

    useEffect(() => {
        //const sub = configureDiscovery("_home-assistant._tcp", (service) => {
        //    console.log(service);
        //SetServices([...services, service]);
        //})
        //startDiscovery();
        //return () => sub.remove();
        //const hi = hello();
        //setGreeting(hi);
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, flexBasis: 0, flexGrow: 1, flexShrink: 1, backgroundColor: '#dad7cd', marginTop: 36 }}>
            <View style={styles.header}>
                <Text numberOfLines={1} style={styles.headerTitle}>
                    Find Home Assistant
                </Text>
            </View>
            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>found on Local network</Text>
                    <View style={styles.sectionBody}>
                        {
                            services.map((service, i) => {
                                let classes: any = [styles.rowWrapper];
                                if (i === 0) {
                                    classes = [...classes, styles.rowFirst]
                                }
                                if (i === services.length - 1) {
                                    classes = [...classes, styles.rowLast]
                                }
                                return (
                                    <View key={i} style={classes}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                router.push(
                                                    {
                                                        pathname: route_options.connect,
                                                        params: {
                                                            url: `http://${service.address}:${service.port}`
                                                        }
                                                    }
                                                )
                                            }}
                                            style={styles.row}>
                                            <Text style={styles.rowLabel}>{service.address}</Text>
                                            <View style={styles.rowSpacer} />
                                            <Feather
                                                color="#bcbcbc"
                                                name="chevron-right"
                                                size={19} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>

            </View>
            <View>
                <Text>{greeting}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Enter Details Manually</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 0 }}>
                <View style={{ backgroundColor: "white", marginBottom: 24 }}>
                    <Picker
                        selectedValue={urlScheme}
                        onValueChange={(itemValue, itemIndex) =>
                            setUrlScheme(itemValue)

                        }>
                        <Picker.Item label="http://" value="http" />
                        <Picker.Item label="https://" value="https" />
                    </Picker>
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 24 }}>{urlScheme}://</Text>
                        <View>
                            <TextInput style={{ backgroundColor: "#ffffff" }} value={ha} onChangeText={(val) => setHA(val)} />
                        </View>
                        <Text style={{ fontSize: 32, marginHorizontal: 8 }}>:</Text>
                        <View>
                            <TextInput style={{ backgroundColor: "#ffffff" }} value={ha} onChangeText={(val) => setHA(val)} />
                        </View>
                    </View>
                </View>
            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 24,
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: '#000',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: 16,
    },
    section: {
        paddingVertical: 12,
    },
    sectionTitle: {
        margin: 8,
        marginLeft: 12,
        fontSize: 13,
        letterSpacing: 0.33,
        fontWeight: '500',
        color: '#000000',
        textTransform: 'uppercase',
    },
    sectionBody: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    row: {
        height: 44,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 12,
    },
    rowWrapper: {
        paddingLeft: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
    },
    rowFirst: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    rowLabel: {
        fontSize: 16,
        letterSpacing: 0.24,
        color: '#000',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    rowValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ababab',
        marginRight: 4,
    },
    rowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    rowLabelLogout: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        color: '#dc2626',
    },
});
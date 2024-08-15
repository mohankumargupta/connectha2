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
import { getItem } from '../auth';
import { AuthData } from '@/constants/AuthData';

export default function Settings() {
    const [form, setForm] = useState({
        emailNotifications: true,
        pushNotifications: false,
    });
    const [urlScheme, setUrlScheme] = useState('http');
    const [ha, setHA] = useState('')
    const [haservers, setHAServers] = useState<string[]>([]);

    useEffect(() => {
        function removeDuplicates(arr: string[]): string[] {
            return [...new Set(arr)];
        }

        async function load() {
            const serversStringifed = await getItem(AuthData.ha_server_list);
            console.log(serversStringifed);

            if (serversStringifed) {
                const servers = JSON.parse(serversStringifed)
                //const uniqueServers = removeDuplicates([servers]);
                console.log(servers);
                setHAServers(servers);

            }

        }
        load();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, flexBasis: 0, flexGrow: 1, flexShrink: 1, marginTop: 36 }}>
            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Home Assistant</Text>
                    <View style={styles.sectionBody}>
                        <View style={[styles.rowWrapper, styles.rowFirst]}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}>
                                <Text style={styles.rowLabel}>http://192.168.1.1:8123</Text>
                                <View style={styles.rowSpacer} />
                                <Feather
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19} />
                            </TouchableOpacity>

                        </View>
                        {
                            haservers.map((elem) => {
                                return (
                                    <View style={[styles.rowWrapper]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // handle onPress
                                            }}
                                            style={styles.row}>
                                            <Text style={styles.rowLabel}>{elem}</Text>
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
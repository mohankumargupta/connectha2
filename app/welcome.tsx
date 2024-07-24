
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

// You can import supported modules from npm
import { Button } from 'react-native-paper';

export default function FirstSteps() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                style={{ flex: 1 }}
                colors={
                    [Colors.splashPrimary, Colors.splashSecondary]
                }
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.5 }}>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.heading}>First Steps</Text>
                        <Text style={styles.paragraph}>App requires access to your Home Assistant.</Text>

                        <Button style={styles.button}
                            mode="contained"
                            onPress={() => {
                                console.log("hello");
                            }}
                        >Next</Button>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    heading: {
        fontSize: 50,
        fontWeight: 800,
        color: Colors.white,
        textAlign: "center",
    },
    paragraph: {
        margin: 24,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.white,
    },
    button: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 20
    },
});

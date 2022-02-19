import { View, Text, StyleSheet, Button } from 'react-native';
import { BACKGROUND, FONT, TEXT } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const TutorialPage = () => {
    const [theme, setTheme] = useState<string>('default');
    useEffect(() => {
        AsyncStorage.getItem('@theme').then((data) => {
            console.log(data)
        }).catch(() => {
            setTheme('default');
        })
    }, [])
    return (
        <View style={styles.container}>
            <Text style={[styles.header}]>Hvordan spiller man?</Text>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                    Dette er et spill hvor man skal prøve å komme frem til et
                    ord på 5 bokstaver. Når man gjetter på et ord så vil hver
                    bokstav få en farge.
                </Text>
                <Text style={styles.textStyle}>
                    Svart bokstav betyr at den ikke er en del av ordet. Gul
                    bokstav betyr at den er en del av ordet, men at den er
                    plassert i feil posisjon. Grønn bokstav betyr at den er en
                    del av ordet og at den er riktig plassert.
                </Text>
                <Text style={styles.textStyle}>
                    Målet er å tippe ordet før man har brukt opp forsøkene sine!
                </Text>
            </View>
            <Text style={styles.signature}>Lagd av Kjerand Evje</Text>
            <Button title='Standard' onPress={async () => {
                try {
                    await AsyncStorage.setItem('@theme', 'default')
                } catch (e) {
                    // saving error
                }
            }} />
            <Button title='Standard' onPress={async () => {
                try {
                    await AsyncStorage.setItem('@theme', 'blue')
                } catch (e) {
                    // saving error
                }
            }} />
        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 50,
        flexGrow: 1
    },
    header: {
        color: TEXT,
        fontSize: 30,
        fontFamily: FONT,
        fontWeight: 'bold',
        marginBottom: 15
    },
    textStyle: {
        color: TEXT,
        fontSize: 20,
        fontFamily: FONT,
        marginBottom: 15
    },
    textContainer: {
        marginHorizontal: 20
    },
    signature: {
        fontSize: 16,
        fontFamily: FONT,
        color: TEXT,
        justifyContent: 'flex-end',
        marginTop: 'auto'
    }
});
export default TutorialPage;

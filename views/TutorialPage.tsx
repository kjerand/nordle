import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import {
    BACKGROUND,
    BUTTONS,
    FONT,
    SMALLSCREEN,
    TEXT
} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setTheme } from '../store/theme';

const TutorialPage = () => {
    const { theme } = useSelector((state: RootStateOrAny) => state.theme);

    return (
        <View
            style={[styles.container, { backgroundColor: BACKGROUND[theme] }]}
        >
            <Text style={styles.header}>Hvordan spiller man?</Text>
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
                    Målet er å tippe ordet før man har brukt opp alle forsøkene
                    sine!
                </Text>
            </View>

            <Text style={styles.signature}>Laget av Kjerand Evje</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginHorizontal: 30
    },
    signature: {
        fontSize: 16,
        fontFamily: FONT,
        color: TEXT,
        justifyContent: 'flex-end',
        marginTop: 'auto'
    },
    buttonStyle: {
        flex: 1,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
        marginBottom: !SMALLSCREEN ? 40 : 20
    }
});
export default TutorialPage;

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    BACKGROUND,
    BUTTONS,
    FONT,
    SMALLSCREEN,
    TEXT
} from '../utils/constants';

import { setTheme } from '../store/theme';
import { setMode } from '../store/settings';

const SettingsPage = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootStateOrAny) => state.theme);
    const { mode } = useSelector((state: RootStateOrAny) => state.settings);
    const ThemeButton = ({
        themeValue,
        text
    }: {
        themeValue: string;
        text: string;
    }) => {
        return (
            <Pressable
                onPress={() => {
                    dispatch(setTheme(themeValue));
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    AsyncStorage.setItem('@theme', themeValue);
                }}
                style={[
                    styles.buttonStyle,
                    { backgroundColor: BUTTONS[theme] }
                ]}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        color: TEXT[theme],
                        fontSize: 18,
                        fontFamily: FONT
                    }}
                >
                    {text}
                </Text>
            </Pressable>
        );
    };
    return (
        <View
            style={[styles.container, { backgroundColor: BACKGROUND[theme] }]}
        >
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.header, { color: TEXT[theme] }]}>
                    Vanskelig modus
                </Text>
                <CheckBox
                    disabled={false}
                    isChecked={mode === 1}
                    onClick={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        if (mode === 1) {
                            dispatch(setMode(0));
                            AsyncStorage.setItem('@mode', '0');
                        } else {
                            dispatch(setMode(1));
                            AsyncStorage.setItem('@mode', '1');
                        }
                    }}
                    style={styles.checkBoxStyle}
                    checkBoxColor={TEXT[theme]}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                    Vanskelig modus krever at du må bruke alle bokstaver som er
                    blitt grønne.
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.header, { color: TEXT[theme] }]}>
                    Streng modus
                </Text>
                <CheckBox
                    disabled={false}
                    isChecked={mode === 2}
                    onClick={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        if (mode === 2) {
                            dispatch(setMode(0));
                            AsyncStorage.setItem('@mode', '0');
                        } else {
                            dispatch(setMode(2));
                            AsyncStorage.setItem('@mode', '2');
                        }
                    }}
                    style={styles.checkBoxStyle}
                    checkBoxColor={TEXT[theme]}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                    Streng modus krever at du må bruke alle bokstaver som er
                    blitt grønne og du kan ikke bruke bokstaver som er blitt
                    mørk grå.
                </Text>
            </View>
            <Text style={[styles.header, { color: TEXT[theme] }]}>
                Fargetema
            </Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                <ThemeButton themeValue="black" text="Svart" />
                <ThemeButton themeValue="white" text="Hvit" />
                <ThemeButton themeValue="default" text="Grå" />
                <ThemeButton themeValue="blue" text="Blå" />
                <ThemeButton themeValue="green" text="Grønn" />
            </View>

            <Text style={[styles.signature, { color: TEXT[theme] }]}>
                Laget av Kjerand Evje
            </Text>
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
        fontSize: 26,
        fontFamily: FONT,
        fontWeight: 'bold',
        marginBottom: 10
    },
    checkBoxStyle: {
        marginTop: 11,
        marginLeft: 10
    },
    textStyle: {
        fontSize: 19,
        fontFamily: FONT,
        marginBottom: 10
    },
    textContainer: {
        marginHorizontal: 30,
        marginBottom: 20
    },
    signature: {
        fontSize: 16,
        fontFamily: FONT,
        justifyContent: 'flex-end',
        marginTop: 'auto'
    },
    buttonStyle: {
        flex: 1,
        marginHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
        marginBottom: !SMALLSCREEN ? 40 : 20
    }
});

export default SettingsPage;

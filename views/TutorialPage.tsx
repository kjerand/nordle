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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { setTheme } from '../store/theme';
import { setHardMode } from '../store/settings';

const TutorialPage = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootStateOrAny) => state.theme);
    const { hardMode } = useSelector((state: RootStateOrAny) => state.settings);

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
                        color: TEXT,
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
                    Målet er å tippe ordet før man har brukt opp forsøkene sine!
                </Text>
            </View>

            <Text style={styles.header}>
                Vanskelig modus{' '}
                <BouncyCheckbox
                    fillColor={BUTTONS[theme]}
                    isChecked={hardMode}
                    onPress={(isChecked: boolean) => {
                        dispatch(setHardMode(isChecked));

                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                        if (isChecked) AsyncStorage.setItem('@hardMode', '1');
                        else if (!isChecked)
                            AsyncStorage.setItem('@hardMode', '0');
                    }}
                />
            </Text>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                    Vanskelig modus krever at du må bruke alle grønne bokstaver.
                </Text>
            </View>
            <Text style={styles.header}>Fargetema</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                <ThemeButton themeValue="default" text="Grå" />
                <ThemeButton themeValue="black" text="Svart" />
                <ThemeButton themeValue="green" text="Grønn" />
                <ThemeButton themeValue="blue" text="Blå" />
                <ThemeButton themeValue="red" text="Rød" />
            </View>

            <Text style={styles.signature}>Laget av Kjerand Evje</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 50,
        flexGrow: 1
    },
    header: {
        color: TEXT,
        fontSize: 26,
        fontFamily: FONT,
        fontWeight: 'bold',
        marginBottom: 10
    },
    textStyle: {
        color: TEXT,
        fontSize: 20,
        fontFamily: FONT,
        marginBottom: 10
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

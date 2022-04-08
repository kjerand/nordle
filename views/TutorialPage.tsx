import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';
import { BACKGROUND, FONT, TEXT } from '../utils/constants';

const TutorialPage = () => {
    const { theme } = useSelector((state: RootStateOrAny) => state.theme);

    return (
        <View
            style={[styles.container, { backgroundColor: BACKGROUND[theme] }]}
        >
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center'
                }}
            >
                <Text style={[styles.header, { color: TEXT[theme] }]}>
                    Hvordan spiller man?
                </Text>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        Dette er et spill hvor man skal prøve å komme frem til
                        et ord på 5 bokstaver. Når man gjetter på et ord så vil
                        hver bokstav få en farge.
                    </Text>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        Svart bokstav betyr at den ikke er en del av ordet. Gul
                        bokstav betyr at den er en del av ordet, men at den er
                        plassert i feil posisjon. Grønn bokstav betyr at den er
                        en del av ordet og at den er riktig plassert.
                    </Text>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        Målet er å tippe ordet før man har brukt opp alle
                        forsøkene sine!
                    </Text>
                </View>
                <Text style={[styles.header, { color: TEXT[theme] }]}>
                    Hva er forskjellen på oppgavene?
                </Text>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        Dagens oppgave oppdateres ved midnatt hver dag og vil
                        være den samme for alle brukere.
                    </Text>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        Tilfeldig oppgave vil gi deg en unik oppgave hver gang
                        du starter et nytt spill.
                    </Text>
                </View>
            </ScrollView>
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
        paddingBottom: 50,
        flexGrow: 1
    },
    header: {
        marginTop: 20,
        fontSize: 30,
        fontFamily: FONT,
        fontWeight: 'bold',
        marginBottom: 15,
        justifyContent: 'center'
    },
    textStyle: {
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
        justifyContent: 'flex-end',
        marginTop: 'auto'
    }
});
export default TutorialPage;

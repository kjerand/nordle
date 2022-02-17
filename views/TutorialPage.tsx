import { View, Text, StyleSheet } from 'react-native';
import { BACKGROUND, FONT, TEXT } from '../utils/constants';

const TutorialPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hvordan spiller man?</Text>
            <Text style={styles.textStyle}>
                Wordle er et spill hvor man skal prøve å komme frem til et ord
                på 5 bokstaver. Når man gjetter på et ord så vil hver bokstav få
                en farge.
            </Text>
            <Text style={styles.textStyle}>
                Svart bokstav betyr at den ikke er en del av ordet. Gul bokstav
                betyr at den er en del av ordet, men at den er plassert i feil
                posisjon. Grønn bokstav betyr at den er en del av ordet og at
                den er riktig plassert.
            </Text>
            <Text style={styles.textStyle}>
                Det kommer en ny "Dagens oppgave" hver dag ved midnatt.
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 120
    },
    header: {
        color: TEXT,
        fontSize: 30,
        fontFamily: FONT,
        fontWeight: 'bold',
        marginBottom: 25
    },
    textStyle: {
        color: TEXT,
        fontSize: 20,
        fontFamily: FONT,
        marginHorizontal: 30,
        marginBottom: 25
    }
});
export default TutorialPage;

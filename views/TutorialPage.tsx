import { View, Text, StyleSheet } from 'react-native';
import { BACKGROUND } from '../utils/constants';

const TutorialPage = () => {
    return (
        <View style={styles.container}>
            <Text
                style={{
                    color: 'white',
                    fontSize: 30,
                    fontFamily: 'Oswald',
                    fontWeight: 'bold'
                }}
            >
                Hvordan spiller man?
            </Text>
            <Text
                style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Oswald',
                    marginHorizontal: 40,
                    marginVertical: 10
                }}
            >
                Wordle er et spill hvor man skal prøve å komme frem til et ord
                på 5 bokstaver. Når man gjetter på et ord får man informasjon
                basert på fargen til hver bokstav.
            </Text>
            <Text
                style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Oswald',
                    marginHorizontal: 40,
                    marginBottom: 20
                }}
            >
                At bokstaven blir svart betyr at bokstaven ikke er en del av
                ordet. At bokstaven blir gul betyr at bokstaven er en del av
                ordet, men at den er plassert i feil posisjon. At bokstaven blir
                grønn betyr at bokstaven er riktig, og at den er plassert i
                riktig posisjon.
            </Text>
            <Text
                style={{
                    color: 'white',
                    fontSize: 30,
                    fontFamily: 'Oswald',
                    fontWeight: 'bold'
                }}
            >
                Hva er de forskjellige spillmodusene?
            </Text>
            <Text
                style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Oswald',
                    marginHorizontal: 40,
                    marginVertical: 20
                }}
            >
                De forskjellige spillmodusene er varianter hvor man har
                varierende antall muligheter til å gjette. Jo færre ord man kan
                gjette, jo mer utfordrende blir det.
            </Text>
            <Text
                style={{
                    color: 'white',
                    fontSize: 30,
                    fontFamily: 'Oswald',
                    fontWeight: 'bold'
                }}
            >
                Hvilke ord er gyldige?
            </Text>
            <Text
                style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Oswald',
                    marginHorizontal: 40,
                    marginVertical: 20
                }}
            >
                De mulige svarene kan kun være ord hentet fra den Norske ordbok
                og det er også kun lov til å gjette disse.
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
    }
});

export default TutorialPage;

import { View, Button, Text, StyleSheet, Pressable, Image } from 'react-native';
import Logo from '../assets/logo.png';
import * as Haptics from 'expo-haptics';
import { getRandomWord } from '../utils/getRandomWord';
import { KEYBOARD } from '../utils/constants';

const MenuPage = ({ navigation }: { navigation: any }) => {
    const MenuButton = ({
        navigate,
        text,
        gridLength
    }: {
        navigate: string;
        text: string;
        gridLength?: number;
    }) => {
        return (
            <Pressable
                style={{
                    width: 300,
                    backgroundColor: KEYBOARD,
                    borderRadius: 4,
                    marginBottom: 40
                }}
                onPress={() => {
                    navigation.navigate(navigate, {
                        gridLength: gridLength,
                        gridWidth: 5,
                        currentWord: getRandomWord()
                    });
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        textAlign: 'center',
                        paddingVertical: 10,
                        color: 'white',
                        fontFamily: 'Oswald'
                    }}
                >
                    {text}
                </Text>
            </Pressable>
        );
    };
    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={{
                    height: 300,
                    width: 300,
                    borderRadius: 4
                }}
            />

            <MenuButton
                navigate="Wordle Norge"
                text="Standard"
                gridLength={6}
            />
            <MenuButton
                navigate="Wordle Norge"
                text="Nybegynner"
                gridLength={7}
            />
            <MenuButton
                navigate="Wordle Norge"
                text="Utfordring"
                gridLength={4}
            />

            <MenuButton navigate="Hjelp" text="Hjelp" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262625',
        alignItems: 'center',

        paddingTop: 40
    }
});

export default MenuPage;

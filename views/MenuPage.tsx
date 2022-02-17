import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

import { getRandomWord } from '../utils/getRandomWord';
import { getDailyWord } from '../utils/getDailyWord';
import {
    BACKGROUND,
    FONT,
    KEYBOARD,
    SMALLSCREEN,
    TEXT
} from '../utils/constants';

import { useState } from 'react';

const MenuPage = ({ navigation }: { navigation: any }) => {
    const MenuButton = ({
        navigate,
        text,
        gridLength,
        daily = false
    }: {
        navigate: string;
        text: string;
        gridLength?: number;
        daily?: boolean;
    }) => {
        return (
            <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                    navigation.navigate(navigate, {
                        gridLength: gridLength,
                        gridWidth: 5,
                        currentWord: daily ? getDailyWord() : getRandomWord()
                    });
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
            >
                <Text style={styles.textStyle}>{text}</Text>
            </Pressable>
        );
    };

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const cacheResourcesAsync = async (): Promise<void> => {
        const image = require('../assets/images/logo.png');

        Asset.fromModule(image)
            .downloadAsync()
            .then(() => {
                return;
            });
    };

    if (isLoading) {
        return (
            <AppLoading
                startAsync={cacheResourcesAsync}
                onFinish={() => setIsLoading(false)}
                onError={console.warn}
            />
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.imageStyle}
            />
            <MenuButton
                navigate="Daily"
                text="Dagens oppgave"
                gridLength={6}
                daily={true}
            />
            <MenuButton navigate="Standard" text="Standard" gridLength={6} />
            <MenuButton navigate="Standard" text="Utfordring" gridLength={4} />
            <MenuButton navigate="Help" text="Hjelp" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
        alignItems: 'center',
        paddingTop: !SMALLSCREEN ? 40 : 0
    },
    imageStyle: {
        height: 300,
        width: 300,
        borderRadius: 4
    },
    buttonStyle: {
        width: '70%',
        backgroundColor: KEYBOARD,
        borderRadius: 5,
        marginBottom: !SMALLSCREEN ? 40 : 20
    },
    textStyle: {
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 10,
        color: TEXT,
        fontFamily: FONT
    }
});

export default MenuPage;

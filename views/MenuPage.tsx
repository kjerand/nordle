import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useSelector, RootStateOrAny } from 'react-redux';
import * as Haptics from 'expo-haptics';

import { getRandomWord } from '../utils/getRandomWord';
import { getDailyWord } from '../utils/getDailyWord';

import {
    BACKGROUND,
    BUTTONS,
    FONT,
    KEYBOARD,
    LARGESCREEN,
    SMALLSCREEN,
    TEXT
} from '../utils/constants';
import { getInitialPosition } from '../utils/getInitialPosition';
import { getCurrentDate } from '../utils/getCurrentDate';
import { useEffect } from 'react';

const MenuPage = ({ navigation }: { navigation: any }) => {
    const { theme } = useSelector((state: RootStateOrAny) => state.theme);
    const save = useSelector((state: RootStateOrAny) => state.save);

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
                style={[
                    styles.buttonStyle,
                    {
                        backgroundColor: BUTTONS[theme]
                    }
                ]}
                onPress={() => {
                    navigation.navigate(navigate, {
                        gridLength: gridLength,
                        gridWidth: 5,
                        currentWord: daily ? getDailyWord() : getRandomWord(),
                        daily: daily,
                        initialPosition: getInitialPosition(
                            save.savedGrid,
                            save.date !== getCurrentDate(),
                            daily
                        ),
                        savedGame:
                            daily &&
                            save.savedGrid.length > 0 &&
                            getCurrentDate() === save.date &&
                            save,
                        initialDate: getCurrentDate()
                    });
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
            >
                <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                    {text}
                </Text>
            </Pressable>
        );
    };

    return (
        <View
            style={[styles.container, { backgroundColor: BACKGROUND[theme] }]}
        >
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
            <MenuButton
                navigate="Standard"
                text="Tilfeldig oppgave"
                gridLength={6}
            />
            <MenuButton navigate="Help" text="Hjelp" />
            <MenuButton navigate="Settings" text="Innstillinger" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: !SMALLSCREEN ? 40 : 20
    },
    imageStyle: {
        height: LARGESCREEN ? 320 : 300,
        width: LARGESCREEN ? 320 : 300,
        marginVertical: LARGESCREEN ? 25 : 0
    },
    buttonStyle: {
        width: '65%',
        borderRadius: 5,
        marginBottom: !SMALLSCREEN ? 30 : 15,
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: FONT
    }
});

export default MenuPage;

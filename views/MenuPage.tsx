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
    SMALLSCREEN,
    TEXT
} from '../utils/constants';

const MenuPage = ({ navigation }: { navigation: any }) => {
    const { theme } = useSelector((state: RootStateOrAny) => state.theme);

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
                    { backgroundColor: BUTTONS[theme] }
                ]}
                onPress={() => {
                    navigation.navigate(navigate, {
                        gridLength: gridLength,
                        gridWidth: 5,
                        currentWord: daily ? getDailyWord() : getRandomWord(),
                        daily: daily
                    });
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
            >
                <Text style={styles.textStyle}>{text}</Text>
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
            <MenuButton navigate="Standard" text="Standard" gridLength={6} />
            <MenuButton navigate="Standard" text="Utfordring" gridLength={4} />
            <MenuButton navigate="Help" text="Hjelp" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: !SMALLSCREEN ? 40 : 0
    },
    imageStyle: {
        height: 300,
        width: 300,
        borderRadius: 4
    },
    buttonStyle: {
        width: '65%',
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

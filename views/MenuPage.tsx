import { RootState } from '../store/store';
import { View, Text, Pressable, Image, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { getRandomWord } from '../utils/getRandomWord';
import { getDailyWord } from '../utils/getDailyWord';

import {
    BACKGROUND,
    CARD,
    FONT,
    LARGESCREEN,
    SMALLSCREEN,
    TEXT,
    SECONDARY_TEXT,
    ACCENT
} from '../utils/constants';
import { getInitialPosition } from '../utils/getInitialPosition';
import { getCurrentDate } from '../utils/getCurrentDate';
import { t } from '../utils/i18n';

const MenuPage = ({ navigation }: { navigation: any }) => {
    const { theme } = useSelector((state: RootState) => state.theme);
    const save = useSelector((state: RootState) => state.save);
    const { language } = useSelector((state: RootState) => state.language);

    const MenuButton = ({
        navigate,
        text,
        icon,
        gridLength,
        daily = false,
        accent = false
    }: {
        navigate: string;
        text: string;
        icon: keyof typeof Feather.glyphMap;
        gridLength?: number;
        daily?: boolean;
        accent?: boolean;
    }) => {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.buttonStyle,
                    {
                        backgroundColor: accent ? ACCENT : CARD[theme],
                        opacity: pressed ? 0.85 : 1,
                        ...Platform.select({
                            ios: {
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.15,
                                shadowRadius: 6
                            },
                            android: {
                                elevation: 3
                            }
                        })
                    }
                ]}
                onPress={() => {
                    if (gridLength) {
                        navigation.navigate(navigate, {
                            gridLength: gridLength,
                            gridWidth: 5,
                            currentWord: daily
                                ? getDailyWord(language)
                                : getRandomWord(language),
                            daily: daily,
                            initialPosition: getInitialPosition(
                                save.savedGrid,
                                save.date !== getCurrentDate(language),
                                daily
                            ),
                            savedGame:
                                daily &&
                                save.savedGrid.length > 0 &&
                                getCurrentDate(language) === save.date &&
                                save,
                            initialDate: getCurrentDate(language)
                        });
                    } else {
                        navigation.navigate(navigate);
                    }
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
            >
                <Feather
                    name={icon}
                    size={22}
                    color={accent ? '#fff' : TEXT[theme]}
                    style={styles.buttonIcon}
                />
                <Text
                    style={[
                        styles.textStyle,
                        { color: accent ? '#fff' : TEXT[theme] }
                    ]}
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
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.imageStyle}
            />

            <View style={styles.buttonGroup}>
                <MenuButton
                    navigate="Daily"
                    text={t('dailyGame', language)}
                    icon="calendar"
                    gridLength={6}
                    daily={true}
                />
                <MenuButton
                    navigate="Standard"
                    text={t('randomGame', language)}
                    icon="shuffle"
                    gridLength={6}
                />
                <MenuButton
                    navigate="Leaderboard"
                    text={t('leaderboard', language)}
                    icon="award"
                    accent={true}
                />
            </View>

            <View style={styles.secondaryGroup}>
                <Pressable
                    style={({ pressed }) => [
                        styles.secondaryButton,
                        {
                            borderColor: SECONDARY_TEXT[theme],
                            opacity: pressed ? 0.7 : 1
                        }
                    ]}
                    onPress={() => {
                        navigation.navigate('Help');
                        Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Medium
                        );
                    }}
                >
                    <Feather
                        name="help-circle"
                        size={18}
                        color={SECONDARY_TEXT[theme]}
                    />
                    <Text
                        style={[
                            styles.secondaryText,
                            { color: SECONDARY_TEXT[theme] }
                        ]}
                    >
                        {t('help', language)}
                    </Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.secondaryButton,
                        {
                            borderColor: SECONDARY_TEXT[theme],
                            opacity: pressed ? 0.7 : 1
                        }
                    ]}
                    onPress={() => {
                        navigation.navigate('Settings');
                        Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Medium
                        );
                    }}
                >
                    <Feather
                        name="settings"
                        size={18}
                        color={SECONDARY_TEXT[theme]}
                    />
                    <Text
                        style={[
                            styles.secondaryText,
                            { color: SECONDARY_TEXT[theme] }
                        ]}
                    >
                        {t('settings', language)}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: SMALLSCREEN ? 16 : 32,
        paddingHorizontal: 24
    },
    imageStyle: {
        height: LARGESCREEN ? 280 : SMALLSCREEN ? 220 : 260,
        width: LARGESCREEN ? 280 : SMALLSCREEN ? 220 : 260,
        marginBottom: LARGESCREEN ? 24 : SMALLSCREEN ? 8 : 16
    },
    buttonGroup: {
        width: '100%',
        maxWidth: 340,
        gap: SMALLSCREEN ? 10 : 14
    },
    buttonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SMALLSCREEN ? 14 : 16,
        borderRadius: 16,
        gap: 10
    },
    buttonIcon: {
        marginTop: 1
    },
    textStyle: {
        fontSize: SMALLSCREEN ? 19 : 21,
        fontFamily: FONT,
        fontWeight: '600'
    },
    secondaryGroup: {
        flexDirection: 'row',
        marginTop: SMALLSCREEN ? 20 : 32,
        gap: 16
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
        borderWidth: 1,
        gap: 6
    },
    secondaryText: {
        fontSize: 15,
        fontFamily: FONT
    }
});

export default MenuPage;

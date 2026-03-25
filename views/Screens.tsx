import { RootState } from '../store/store';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/theme';

import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useFonts } from 'expo-font';

import { BACKGROUND, FONT, TEXT } from '../utils/constants';
import { getCurrentDate } from '../utils/getCurrentDate';
import { t } from '../utils/i18n';

import GamePage from './GamePage';
import MenuPage from './MenuPage';
import TutorialPage from './TutorialPage';
import SettingsPage from './SettingsPage';
import LeaderboardPage from './LeaderboardPage';
import { setMode } from '../store/settings';
import { setSavedGame } from '../store/save';
import {
    setDistribution,
    setTotalGames,
    setTotalWins,
    setVisible
} from '../store/statistics';
import { setLeaderboardProfile } from '../store/leaderboard';
import { setLanguage } from '../store/language';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Screens() {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.theme);
    const { visible } = useSelector(
        (state: RootState) => state.statistics
    );
    const { language } = useSelector((state: RootState) => state.language);

    const loadLanguageData = (lang: Language) => {
        const suffix = `_${lang}`;

        AsyncStorage.getItem(`@statistics${suffix}`).then((data) => {
            if (data) {
                let statistics: Statistics = JSON.parse(data);
                dispatch(setTotalGames(statistics.totalGames));
                dispatch(setTotalWins(statistics.totalWins));
                dispatch(setDistribution(statistics.distribution));
            } else {
                dispatch(setTotalGames(0));
                dispatch(setTotalWins(0));
                dispatch(setDistribution([0, 0, 0, 0, 0, 0]));
            }
        });

        AsyncStorage.getItem(`@grid${suffix}`).then((grid) => {
            if (grid) {
                AsyncStorage.getItem(`@keyboard${suffix}`).then((keyboard) => {
                    if (keyboard) {
                        AsyncStorage.getItem(`@date${suffix}`).then((date) => {
                            if (date) {
                                AsyncStorage.getItem(
                                    `@finished${suffix}`
                                ).then((finished) => {
                                    if (finished) {
                                        const savedGame: SavedGame = {
                                            savedGrid: JSON.parse(grid),
                                            savedKeyboard:
                                                JSON.parse(keyboard),
                                            date: date,
                                            finished: parseInt(finished)
                                        };

                                        dispatch(setSavedGame(savedGame));
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                dispatch(
                    setSavedGame({
                        savedGrid: [],
                        savedKeyboard: [],
                        date: '',
                        finished: 0
                    })
                );
            }
        });
    };

    useEffect(() => {
        AsyncStorage.getItem('@mode').then((data) => {
            if (data) dispatch(setMode(parseInt(data)));
        });

        AsyncStorage.getItem('@theme').then((data) => {
            if (data) dispatch(setTheme(data));
        });

        AsyncStorage.getItem('@language').then((data) => {
            if (data) {
                const lang = data as Language;
                dispatch(setLanguage(lang));
                loadLanguageData(lang);
            } else {
                loadLanguageData('no');
            }
        });

        AsyncStorage.getItem('@leaderboard').then((data) => {
            if (data) {
                const profile: LeaderboardState = JSON.parse(data);
                dispatch(setLeaderboardProfile(profile));
            }
        });
    }, []);

    useEffect(() => {
        loadLanguageData(language);
    }, [language]);

    const [loaded] = useFonts({
        Oswald: require('../assets/fonts/Oswald-Light.ttf')
    });

    if (!loaded) {
        return <View style={{ backgroundColor: BACKGROUND[theme], flex: 1 }} />;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: BACKGROUND[theme]
                    },
                    headerTintColor: TEXT[theme],
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontFamily: FONT,
                        fontSize: 22
                    },
                    headerBackTitleVisible: false,
                    gestureEnabled: false,
                    animation: 'slide_from_bottom',
                    headerTitleAlign: 'center'
                }}
            >
                <Stack.Screen
                    name="Menu"
                    options={{
                        headerShown: false
                    }}
                    component={MenuPage}
                />
                <Stack.Screen
                    name="Daily"
                    component={GamePage}
                    options={({ navigation }) => ({
                        headerTitle: getCurrentDate(language),
                        title: getCurrentDate(language),
                        headerRight: () => (
                            <Feather
                                name="bar-chart"
                                size={28}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    dispatch(setVisible(!visible));
                                }}
                            />
                        ),
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={26}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    navigation.navigate('Menu');
                                }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Standard"
                    component={GamePage}
                    options={({ navigation }) => ({
                        headerTitle: 'Nordle!',
                        title: 'Nordle!',
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    navigation.navigate('Menu');
                                }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Help"
                    component={TutorialPage}
                    options={({ navigation }) => ({
                        headerTitle: t('help', language),
                        title: t('help', language),
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    navigation.navigate('Menu');
                                }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsPage}
                    options={({ navigation }) => ({
                        headerTitle: t('settings', language),
                        title: t('settings', language),
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    navigation.navigate('Menu');
                                }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Leaderboard"
                    component={LeaderboardPage}
                    options={({ navigation }) => ({
                        headerTitle: t('leaderboard', language),
                        title: t('leaderboard', language),
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    navigation.navigate('Menu');
                                }}
                            />
                        )
                    })}
                />
            </Stack.Navigator>
            <StatusBar hidden />
        </NavigationContainer>
    );
}

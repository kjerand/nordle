import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GamePage from './views/GamePage';
import MenuPage from './views/MenuPage';
import React from 'react';
import { useFonts } from 'expo-font';
import TutorialPage from './views/TutorialPage';
import { BACKGROUND, FONT, TEXT } from './utils/constants';

import { getCurrentDate } from './utils/getCurrentDate';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const Stack = createNativeStackNavigator();

export default function App() {
    const [loaded] = useFonts({
        Oswald: require('./assets/fonts/Oswald-Light.ttf')
    });

    if (!loaded) {
        return null;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: BACKGROUND
                    },
                    headerTintColor: TEXT,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontFamily: FONT,
                        fontSize: 24
                    },

                    headerBackTitleVisible: false,

                    animation: 'slide_from_bottom'
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
                        headerTitle: getCurrentDate(),
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT}
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
                        headerTitle: 'Wordle Norge',
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT}
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
                        headerTitle: '',
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT}
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

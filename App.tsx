import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GamePage from './views/GamePage';
import MenuPage from './views/MenuPage';
import React from 'react';
import { useFonts } from 'expo-font';
import TutorialPage from './views/TutorialPage';
import { BACKGROUND } from './utils/constants';

const Stack = createNativeStackNavigator();

export default function App() {
    const [loaded] = useFonts({
        Roboto: require('./assets/fonts/RobotoCondensed-Regular.ttf'),
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
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontFamily: 'Oswald',
                        fontSize: 24
                    },
                    headerBackTitle: 'Meny',
                    headerBackTitleStyle: {
                        fontFamily: 'Oswald',
                        fontSize: 20
                    }
                }}
            >
                <Stack.Screen
                    name="Meny"
                    options={{
                        headerShown: false
                    }}
                    component={MenuPage}
                />
                <Stack.Screen name="Wordle Norge" component={GamePage} />
                <Stack.Screen name="Hjelp" component={TutorialPage} />
            </Stack.Navigator>
            <StatusBar hidden />
        </NavigationContainer>
    );
}

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import LetterContainer from './LetterContainer';
import { DARKGRAY, GREEN, KEYBOARD, YELLOW } from '../utils/constants';

const COLORS = [KEYBOARD, DARKGRAY, YELLOW, GREEN];

const KeyboardContainer = ({
    onKeyboardPress,
    keyboard
}: {
    onKeyboardPress: CallableFunction;
    keyboard: Letter[][];
}) => {
    const KeyboardRow = ({ letters }: { letters: Letter[] }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {letters.map((letter, index) => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row'
                            }}
                            key={index * 1}
                        >
                            <LetterContainer
                                color={COLORS[letter.status]}
                                keyboard={true}
                            >
                                <Pressable
                                    onPress={() => {
                                        Haptics.impactAsync(
                                            Haptics.ImpactFeedbackStyle.Medium
                                        );
                                        onKeyboardPress(letter.char);
                                    }}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignContent: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: 'white',
                                            fontSize: 20
                                        }}
                                    >
                                        {letter.char === '!' && (
                                            <Feather
                                                name="send"
                                                size={24}
                                                color="white"
                                            />
                                        )}
                                        {letter.char === '<' && (
                                            <Ionicons
                                                name="backspace-outline"
                                                size={24}
                                                color="white"
                                            />
                                        )}
                                        {letter.char !== '!' &&
                                            letter.char !== '<' &&
                                            letter.char}
                                    </Text>
                                </Pressable>
                            </LetterContainer>
                        </View>
                    );
                })}
            </View>
        );
    };
    return (
        <View style={styles.container}>
            {keyboard.map((row, index) => {
                return <KeyboardRow letters={row} key={index} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'flex-end', marginBottom: 60 }
});

export default KeyboardContainer;

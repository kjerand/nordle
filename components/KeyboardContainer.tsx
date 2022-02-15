import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import LetterContainer from './LetterContainer';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { DARKGRAY, GREEN, KEYBOARD, YELLOW } from '../utils/constants';
import { getKeyboardColor } from '../utils/getKeyboardColor';
import { initializeKeyboard } from '../utils/initializeKeyboard';

const COLORS = [KEYBOARD, DARKGRAY, YELLOW, GREEN];

const KeyboardContainer = ({
    onKeyboardPress,
    keyboardStatus
}: {
    onKeyboardPress: CallableFunction;
    keyboardStatus: KeyboardStatus;
}) => {
    const [keyboard, setKeyboard] = useState<Letter[][]>(initializeKeyboard());
    useEffect(() => {
        //getKeyboardColor(keyboard, keyboardStatus, setKeyboard);
    }, [keyboardStatus]);

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
                                        justifyContent: 'center'
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
            <KeyboardRow letters={keyboard[0]} />
            <KeyboardRow letters={keyboard[1]} />
            <KeyboardRow letters={keyboard[2]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'flex-end', marginBottom: 60 }
});

export default KeyboardContainer;

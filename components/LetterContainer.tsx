import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, RootStateOrAny } from 'react-redux';
import { BUTTONS, SMALLSCREEN, TEXT } from '../utils/constants';

const LetterContainer = ({
    color,
    children,
    keyboard = false,
    current = false
}: {
    color: string;
    children: JSX.Element;
    keyboard?: boolean;
    current?: boolean;
}) => {
    const { theme } = useSelector((state: RootStateOrAny) => state.theme);
    const height = () => {
        if (keyboard) {
            if (!SMALLSCREEN) {
                return 65;
            } else {
                return 50;
            }
        } else {
            if (!SMALLSCREEN) {
                return 60;
            } else {
                return 55;
            }
        }
    };
    const styles = StyleSheet.create({
        container: {
            backgroundColor: color,
            height: height(),
            width: keyboard ? '90%' : '17%',
            marginHorizontal: keyboard ? 0 : 6,
            marginVertical: 3,
            borderRadius: 5,
            borderColor: TEXT[theme],
            borderStyle: 'solid',
            borderWidth: current ? 2 : 0
        }
    });
    return <View style={styles.container}>{children}</View>;
};

export default LetterContainer;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SMALLSCREEN } from '../utils/constants';

const LetterContainer = ({
    color,
    children,
    keyboard = false
}: {
    color: string;
    children: JSX.Element;
    keyboard?: boolean;
}) => {
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
            borderRadius: 5
        }
    });
    return <View style={styles.container}>{children}</View>;
};

export default LetterContainer;

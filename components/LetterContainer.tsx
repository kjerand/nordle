import React from 'react';
import { View, StyleSheet } from 'react-native';

const LetterContainer = ({
    color,
    children,
    keyboard = false
}: {
    color: string;
    children: JSX.Element;
    keyboard?: boolean;
}) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: color,
            height: keyboard ? 65 : 60,
            width: keyboard ? '90%' : '17%',
            marginHorizontal: keyboard ? 0 : 6,
            marginVertical: 3,
            borderRadius: 5
        }
    });
    return <View style={styles.container}>{children}</View>;
};

export default LetterContainer;

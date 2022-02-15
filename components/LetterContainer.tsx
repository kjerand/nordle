import React from 'react';
import { View } from 'react-native';

const LetterContainer = ({
    color,
    children,
    keyboard = false
}: {
    color: string;
    children: JSX.Element;
    keyboard?: boolean;
}) => {
    return (
        <View
            style={{
                backgroundColor: color,
                height: keyboard ? 65 : 60,
                width: keyboard ? '90%' : '17%',
                marginHorizontal: keyboard ? 0 : 6,
                marginVertical: 3,
                borderRadius: 5
            }}
        >
            {children}
        </View>
    );
};

export default LetterContainer;

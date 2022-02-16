import React from 'react';
import { View, Text } from 'react-native';
import { TEXT } from '../utils/constants';

const GridBox = ({ letter }: { letter: string }) => {
    return (
        <View
            style={{
                justifyContent: 'center',
                flex: 1
            }}
        >
            <Text
                style={{
                    color: TEXT,
                    textAlign: 'center',

                    fontSize: 32
                }}
            >
                {letter}
            </Text>
        </View>
    );
};

export default GridBox;

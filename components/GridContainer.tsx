import React from 'react';
import { View, Text } from 'react-native';
import { TEXT } from '../utils/constants';

const GridContainer = ({ letter }: { letter: string }) => {
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
                    fontFamily: 'Oswald',
                    fontSize: 32
                }}
            >
                {letter.toLocaleUpperCase()}
            </Text>
        </View>
    );
};

export default GridContainer;

import { View, Text } from 'react-native';

const InformationPopup = ({
    message,
    showPopup
}: {
    message: string;
    showPopup: boolean;
}) => {
    if (!showPopup) {
        return <></>;
    }
    return (
        <View
            style={{
                marginTop: 8,
                alignContent: 'center'
            }}
        >
            <Text
                style={{
                    fontFamily: 'Oswald',
                    fontSize: 20,
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                {message}
            </Text>
        </View>
    );
};

export default InformationPopup;

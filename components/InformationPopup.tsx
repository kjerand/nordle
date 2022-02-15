import { View, Text } from 'react-native';

const InformationPopup = ({
    message,
    showPopup
}: {
    message: string;
    showPopup: boolean;
}) => {
    return showPopup ? (
        <View
            style={{
                backgroundColor: '',
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
    ) : (
        <></>
    );
};

export default InformationPopup;

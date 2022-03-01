import { View, Text } from 'react-native';
import { useSelector, RootStateOrAny } from 'react-redux';
import { FONT, TEXT } from '../utils/constants';

const InformationPopup = ({
    message,
    showPopup
}: {
    message: string;
    showPopup: boolean;
}) => {
    const { theme } = useSelector((state: RootStateOrAny) => state.theme);
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
                    color: TEXT[theme],
                    textAlign: 'center'
                }}
            >
                {message}
            </Text>
        </View>
    );
};

export default InformationPopup;

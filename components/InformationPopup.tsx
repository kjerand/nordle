import { View, Text, Button, Pressable } from 'react-native';
import { useSelector, RootStateOrAny } from 'react-redux';
import { TEXT } from '../utils/constants';
import { Feather } from '@expo/vector-icons';

const InformationPopup = ({
    message,
    showPopup,
    onShare,
    share
}: {
    message: string;
    showPopup: boolean;
    onShare: CallableFunction;
    share: boolean;
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
                {!share
                    ? message
                    : message !== '' && (
                          <>
                              {message}
                              <Pressable
                                  onPress={() => {
                                      onShare();
                                  }}
                                  style={{ paddingLeft: 8 }}
                              >
                                  <Feather
                                      name="share"
                                      size={24}
                                      color={TEXT[theme]}
                                  />
                              </Pressable>
                          </>
                      )}
            </Text>
        </View>
    );
};

export default InformationPopup;

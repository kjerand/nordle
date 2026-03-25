import { RootState } from '../store/store';
import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useSelector } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { BACKGROUND, BUTTONS, FONT, TEXT } from '../utils/constants';
import { t } from '../utils/i18n';

const StatisticsModal = ({
    statistics,
    visible,
    setModalVisible
}: {
    statistics: Statistics;
    visible: boolean;
    setModalVisible: CallableFunction;
}) => {
    const { theme } = useSelector((state: RootState) => state.theme);
    const { language } = useSelector((state: RootState) => state.language);

    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        },

        header: {
            fontSize: 30,
            fontFamily: FONT,
            fontWeight: 'bold',
            marginBottom: 10,
            color: TEXT[theme]
        },

        modalView: {
            backgroundColor: BACKGROUND[theme],
            borderRadius: 5,
            width: '65%',
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            width: '65%',
            borderRadius: 5
        },
        buttonClose: {
            marginTop: 15,
            backgroundColor: BUTTONS[theme]
        },
        textButtonStyle: {
            fontSize: 20,
            textAlign: 'center',
            paddingVertical: 5,
            fontFamily: FONT,
            color: TEXT[theme],
            paddingHorizontal: 20
        },
        modalText: {
            fontSize: 18,
            fontFamily: FONT,
            marginBottom: 8,
            textAlign: 'center',
            color: TEXT[theme]
        }
    });

    const calculateAverage = () => {
        let total = 0;
        statistics.distribution.forEach(
            (value, level) => (total += value * (level + 1))
        );

        return (total / statistics.totalWins).toFixed(2);
    };

    const Columns = ({ text, value }: { text: string; value: string }) => {
        return (
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <Text style={[styles.modalText, { marginRight: 50 }]}>
                    {text}
                </Text>
                <Text style={styles.modalText}>{value}</Text>
            </View>
        );
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setModalVisible(!visible);
            }}
        >
            <Pressable
                style={styles.centeredView}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    setModalVisible(!visible);
                }}
            >
                <Pressable style={styles.modalView} onPress={() => {}}>
                    <Text style={styles.header}>
                        {t('statistics', language)}
                    </Text>
                    <Text style={styles.modalText}>
                        {t('gamesPlayed', language)}: {statistics.totalGames}
                    </Text>
                    <Text style={styles.modalText}>
                        {t('gamesWon', language)}: {statistics.totalWins}
                    </Text>

                    {statistics.totalGames > 0 && (
                        <Text style={styles.modalText}>
                            {t('winPercentage', language)}:{' '}
                            {Math.round(
                                (statistics.totalWins / statistics.totalGames) *
                                    100
                            )}
                            %
                        </Text>
                    )}

                    <Text
                        style={[styles.header, { marginTop: 25, fontSize: 26 }]}
                    >
                        {t('distribution', language)}
                    </Text>
                    <Text style={styles.modalText}>
                        {t('average', language)}: {calculateAverage()}
                    </Text>
                    {statistics.distribution.map((value, level) => {
                        return (
                            <Columns
                                text={
                                    t('attempt', language) +
                                    ' ' +
                                    (level + 1) +
                                    ':'
                                }
                                value={String(value)}
                                key={level}
                            />
                        );
                    })}

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Medium
                            );
                            setModalVisible(!visible);
                        }}
                    >
                        <Text style={styles.textButtonStyle}>
                            {t('close', language)}
                        </Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default StatisticsModal;

import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
const StatisticsModal = ({
    statistics,
    setModalVisible
}: {
    statistics: Statistics;

    setModalVisible: CallableFunction;
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={statistics.visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!statistics.visible);
            }}
        >
            <Pressable
                style={styles.centeredView}
                onPress={() => setModalVisible(!statistics.visible)}
            >
                <Pressable style={styles.modalView} onPress={() => {}}>
                    <Text style={styles.modalText}>Fordeling:</Text>
                    {statistics.distribution.map((value, level) => {
                        return (
                            <Text style={styles.modalText} key={level}>
                                {level}: {value}
                            </Text>
                        );
                    })}
                    <Text style={styles.modalText}>
                        Antall spill: {statistics.totalGames}
                    </Text>
                    <Text style={styles.modalText}>
                        Antall vunnet: {statistics.totalWins}
                    </Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!statistics.visible)}
                    >
                        <Text style={styles.textStyle}>Lukk</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: '#F194FF'
    },
    buttonClose: {
        backgroundColor: '#2196F3'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});

export default StatisticsModal;

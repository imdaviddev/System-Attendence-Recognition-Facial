import { View, Text, StyleSheet, Modal, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'

interface Props {
    message: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    isVisible: boolean | undefined,
    setIsVisible: (visible: boolean) => void,
}

const Dialog: React.FC<Props> = ({ message = "", onConfirm, onCancel, isVisible, setIsVisible }) => {


   const toggleVisibility = () => {
    setIsVisible(!isVisible)
   }

   const handleConfirm = () => {
     toggleVisibility()
     onConfirm? onConfirm() : null
   }

   
   const handleCancel = () => {
    toggleVisibility()
    onCancel? onCancel() : null
  }

    return (
        <Modal visible={isVisible} animationType="fade" transparent={true} onRequestClose={() => toggleVisibility()}>
            <TouchableOpacity style={styles.modalContainer} onPressOut={() => toggleVisibility()}>
                <View style={styles.modalView}>
                    <View style={styles.alert}>
                        <Text style={styles.alertTitle}>Atencion</Text>
                        <Text style={styles.alertMessage}>{message}</Text>
                        <View style={styles.alertButtonGroup}>
                            <View style={styles.alertButton}>
                                <Button title="Confirmar" onPress={handleConfirm} />
                            </View>
                            <View style={styles.alertButton}>
                                <Button title="Cancelar" onPress={handleCancel} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },
    modalContainer: {
        backgroundColor: "#ccc",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
    },
    modalView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    alert: {
        width: '100%',
        maxWidth: 300,
        margin: 48,
        elevation: 24,
        borderRadius: 2,
        backgroundColor: '#fff'
    },
    alertTitle: {
        margin: 24,
        fontWeight: "bold",
        fontSize: 24,
        color: "#000"
    },
    alertMessage: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
        fontSize: 16,
        color: "#000"
    },
    alertButtonGroup: {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 8,
        marginLeft: 24,
        padding: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    alertButton: {
        marginTop: 12,
        marginRight: 8,
        width: 100
    },
});

export default Dialog
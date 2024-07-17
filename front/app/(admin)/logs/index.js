import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ContenedorVista from '@/ui/ContenedorVista';
import { TouchableOpacity } from 'react-native';
import { obtenerOperaciones } from '@/store/logService';

const LogsAdmin = () => {
    const [verMas, setVerMas] = useState(false);
    const [modificar, setModificar] = useState(false);
    const [desactivar, setDesactivar] = useState(false);

    const [log, setLog] = useState(null);
    const [logs, setLogs] = useState([]);

    const handleBtnVerMas = () => {
        setVerMas(true)
    }

    const handleVerMas = (id) => {
        setLog(logs.find(logs => logs.id == id))
        handleBtnVerMas()
    }

    useEffect(() => {
        try{
            obtenerOperaciones()
            .then((listalogs) => setLogs(listalogs))
        }catch(error){
            Alert.alert("Hubo un error al cargar los logs: " + error)
        }
    }, []);

    return (
        <ContenedorVista>
            {/** Lista */}
            <View style={styles.lista}>
                <View style={styles.cardLista}>
                    <Text style={[styles.cardText, { flex: 0.3 }]}>ID</Text>
                    <Text style={styles.cardText}>Operacion</Text>
                    <Text style={styles.cardText}>Fecha</Text>
                    <Text style={{ flex: 0.3 }}></Text>
                </View>
                {logs.map((log) => (
                    <View style={styles.cardLista} key={log.id}>
                        <Text style={[styles.cardText, { flex: 0.3 }]}>{log.id}</Text>
                        <Text style={styles.cardText}>{log.nombre}</Text>
                        <Text style={styles.cardText}>{log.fecha}</Text>
                        <Ionicons
                            name='eye-sharp'
                            style={[styles.cardIcon, { color: "white" }]}
                            onPress={() => handleVerMas(log.id)}
                        />
                    </View>
                ))}
            </View>

            {/** Modal para ver más detalles */}
            {verMas && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={verMas}
                    onRequestClose={() => setVerMas(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContenido}>
                            <View style={styles.modalDetalle}>
                                <View style={styles.modalDetalleFila}>
                                    <Text style={styles.modalText}>OPERACION: </Text>
                                    <Text style={styles.modalText}>{log.nombre}</Text>
                                </View>
                                <View style={styles.modalDetalleFila}>
                                    <Text style={styles.modalText}>Fecha: </Text>
                                    <Text style={styles.modalText}>{log.fecha}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.modalBtnCerrar} onPress={() => setVerMas(false)}>
                                <Text style={styles.modalText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

        </ContenedorVista>
    );
};

const styles = StyleSheet.create({
    /** Contlogador */
    contlogadorContainer: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        flex: 1
    },
    contlogadorBtn: {
        backgroundColor: "black",
        borderRadius: 8,
        borderColor: "white",
        borderWidth: 2,
        minWidth: 100
    },
    contlogadorText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 10
    },

    /** Lista */
    lista: {
        width: "100%",
        flex: 9,
        marginHorizontal: 10,
    },
    cardLista: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "white",
        borderBottomWidth: 2,
        paddingVertical: 20,
        alignItems: "center"
    },
    cardText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
        flex: 1
    },
    cardIcon: {
        flex: 0.3,
        height: 30,
        fontSize: 25,
        textAlign: "center",
        textAlignVertical: "center",
    },

    /** Modal */
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContenido: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        flexBasis: 500,
        minWidth: 300,
        justifyContent: "space-between",
        borderColor: "white",
        borderWidth: 2,
        backgroundColor: "black",
        paddingVertical: 20,
    },
    modalDetalle: {
        width: "100%",
        paddingHorizontal: 10
    },
    modalDetalleFila: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        borderColor: "white",
        borderBottomWidth: 2,
        width: "100%"
    },
    modalText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15
    },
    modalBtnCerrar: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    }
});

export default LogsAdmin;

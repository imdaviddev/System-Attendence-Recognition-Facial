import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ContenedorVista from '@/ui/ContenedorVista';
import Boton from '@/components/Boton';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { obtenerLugares, desactivarLugar } from '@/store/lugarService';

import { stylesVistaAdmin } from '@/styles/styles';

const LugaresAdmin = () => {
  const [verMas, setVerMas] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [desactivar, setDesactivar] = useState(false);

  const [lugar, setLugar] = useState(null);
  const [lugares, setLugares] = useState([]);

  const handleBtnModificar = () => {
    setModificar(!modificar);
    setDesactivar(false);
  };

  const handleBtnDesactivar = () => {
    setDesactivar(!desactivar);
    setModificar(false);
  };

  const handleBtnVerMas = () => {
    setVerMas(true)
  }

  const handleVerMas = (id) => {
    setLugar(lugares.find(lugares => lugares.id == id))
    handleBtnVerMas()
  }

  const handleModificar = (id) => {
    // Lógica para modificar un lugares
  };

  const handleDesactivar = (id) => {
    // Lógica para desactivar un lugar
    try {
      desactivarLugar(id).then(() => {
        Alert.alert("Se dio de baja el lugar")
        setLugares(lugares.filter((lugar) => lugar.id !== id));
      })
    } catch (error) {
      Alert.alert("No se pudo dar de baja el instituto: " + error)
    }

  };

  useEffect(() => {
    try {
      obtenerLugares()
        .then((listaLugares) => setLugares(listaLugares))
    } catch (error) {
      Alert.alert("No se pudieron cargar los lugares: " + error)
    }
  }, []);

  return ( <ContenedorVista>
    {/** Contlugarador del CRUD */}
    <View style={stylesVistaAdmin.controladorContainer}>
      <Boton styles={stylesVistaAdmin.controladorBtn} onPress={() => router.navigate("/(admin)/lugares/registro")}>
        <Text style={stylesVistaAdmin.controladorText}>Alta</Text>
      </Boton>
      <Boton
        onPress={handleBtnModificar}
        styles={[stylesVistaAdmin.controladorBtn, modificar && { backgroundColor: "orange" }]}>
        <Text style={stylesVistaAdmin.controladorText}>Modificar</Text>
      </Boton>
      <Boton
        onPress={handleBtnDesactivar}
        styles={[stylesVistaAdmin.controladorBtn, desactivar && { backgroundColor: "red" }]}>
        <Text style={stylesVistaAdmin.controladorText}>Desactivar</Text>
      </Boton>


    </View>

    {/** Lista */}
    <View style={stylesVistaAdmin.lista}>
      <View style={stylesVistaAdmin.cardLista}>
        <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>ID</Text>
        <Text style={stylesVistaAdmin.cardText}>Nombre</Text>
        <Text style={{ flex: 0.3 }}></Text>
      </View>
      {lugares.map((lugar, index) => (
        <View style={stylesVistaAdmin.cardLista} key={lugar.id}>
          <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>{index+1}</Text>
          <Text style={stylesVistaAdmin.cardText}>{lugar.nombre}</Text>
          {modificar && (
            <Ionicons
              name='pencil-outline'
              style={[stylesVistaAdmin.cardIcon, { color: "orange" }]}
              onPress={() => handleModificar(lugar.id)}
            />
          )}
          {desactivar && (
            <Ionicons
              name='trash-outline'
              style={[stylesVistaAdmin.cardIcon, { color: "red" }]}
              onPress={() => handleDesactivar(lugar.id)}
            />
          )}
          {!modificar && !desactivar && (
            <Ionicons
              name='eye-sharp'
              style={[stylesVistaAdmin.cardIcon, { color: "white" }]}
              onPress={() => handleVerMas(lugar.id)}
            />
          )}
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
        <View style={stylesVistaAdmin.modalContainer}>
          <View style={stylesVistaAdmin.modalContenido}>
            <View style={stylesVistaAdmin.modalDetalle}>
              <View style={stylesVistaAdmin.modalDetalleFila}>
                <Text style={stylesVistaAdmin.modalText}>Nombre: </Text>
                <Text style={stylesVistaAdmin.modalText}>{lugar.nombre}</Text>
              </View>
              <View style={stylesVistaAdmin.modalDetalleFila}>
                <Text style={stylesVistaAdmin.modalText}>Descripcion: </Text>
                <Text style={stylesVistaAdmin.modalText}>{lugar.descripcion}</Text>
              </View>
            </View>
            <TouchableOpacity style={stylesVistaAdmin.modalBtnCerrar} onPress={() => setVerMas(false)}>
              <Text style={stylesVistaAdmin.modalText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )}
  </ContenedorVista>
  );
};

const styles = StyleSheet.create({
  /** Contlugarador */
  controladorContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    height: 80,
    width:"100%"
  },
  controladorBtn: {
    backgroundColor: "black",
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 2,
    minWidth: 100,
  },
  controladorText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10
  },

  /** Lista */
  lista: {
    width: "100%",
    flex: 9,
    margin: 10,
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

export default LugaresAdmin;

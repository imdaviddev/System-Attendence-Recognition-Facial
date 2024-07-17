import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ContenedorVista from '@/ui/ContenedorVista';
import Boton from '@/components/Boton';
import {TouchableOpacity} from 'react-native';
import { router } from 'expo-router';

import { stylesVistaAdmin } from '@/styles/styles';

import { obtenerCategorias, desactivarCategoria } from '@/store/categoriaService'
import lugaresToString from '@/helpers/lugaresToString'

const categoriasAdmin = () => {
  const [verMas, setVerMas] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [desactivar, setDesactivar] = useState(false);

  const [categoria, setCategoria] = useState(null);
  const [categorias, setCategorias] = useState([]);

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
    setCategoria(categorias.find(categoria => categoria.id == id))
    handleBtnVerMas()
  }

  const handleModificar = (id) => {
    // Lógica para modificar un categoria
  };

  const handleDesactivar = (id) => {
    // Lógica para desactivar una empresa
    try {
      desactivarCategoria(id).then(() => {
        Alert.alert("Se dio de baja la categoria")
        setCategorias(categorias.filter((categoria) => categoria.id !== id));
      })
    } catch (error) {
      Alert.alert("No se pudo dar de baja el categoria: " + error)
    }
  };

  useEffect(() => {
    try{
      obtenerCategorias()
      .then((listacategorias) => {
        setCategorias(listacategorias)
      })
    }catch(error){
      Alert.alert("No se pudo cargar las categorias: " +  error)
    } 
  }, []);

  return (
    <ContenedorVista>
      {/** Controlador del CRUD */}
      <View style={stylesVistaAdmin.controladorContainer}>
        <Boton styles={stylesVistaAdmin.controladorBtn} onPress={() => router.navigate("/(admin)/categorias/registro")}>
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
          <Text style={stylesVistaAdmin.cardText}>Lugares</Text>
          <Text style={{ flex: 0.3 }}></Text>
        </View>
        {categorias.map((categoria, index) => (
          <View style={stylesVistaAdmin.cardLista} key={categoria.id}>
            <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>{index+1}</Text>
            <Text style={stylesVistaAdmin.cardText}>{categoria.nombre}</Text>
            <Text style={stylesVistaAdmin.cardText}>{categoria.lugares? lugaresToString(categoria.lugares) : "N/A"}</Text>
            {modificar && (
              <Ionicons
                name='pencil-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "orange" }]}
                onPress={() => handleModificar(categoria.id)}
              />
            )}
            {desactivar && (
              <Ionicons
                name='trash-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "red" }]}
                onPress={() => handleDesactivar(categoria.id)}
              />
            )}
            {!modificar && !desactivar && (
              <Ionicons
                name='eye-sharp'
                style={[stylesVistaAdmin.cardIcon, { color: "white" }]}
                onPress={() => handleVerMas(categoria.id)}
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
                  <Text style={stylesVistaAdmin.modalText}>{categoria.nombre}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Descripcion: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{categoria.descripcion}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Lugares: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{lugaresToString(categoria.lugares)}</Text>
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
  /** Controlador */
  controladorContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    flex: 1
  },
  controladorBtn: {
    backgroundColor: "black",
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 2,
    minWidth: 100
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
    flex:1,
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

export default categoriasAdmin;

import React, { useState, useEffect } from 'react';
import { View, Text, styleheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ContenedorVista from '@/ui/ContenedorVista';
import Boton from '@/components/Boton';
import {TouchableOpacity} from 'react-native';
import { router } from 'expo-router';
import { REGISTRO_DE_VISITANTES } from '@/routes/routes'
import { arrayToStringPerValue } from '@/util/arrayToString';

import { obtenerVisitantes } from '@/store/visitanteService';
import institutosToString from '@/helpers/institutosToString';
import lugaresToString from '@/helpers/lugaresToString';
import { desactivarVisitante } from '@/store/visitanteService';
import { stylesVistaAdmin } from '@/styles/styles';

const VisitantesAdmin = () => {
  const [verMas, setVerMas] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [desactivar, setDesactivar] = useState(false);

  const [visitante, setVisitante] = useState(null);
  const [visitantes, setVisitantes] = useState([]);

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
    setVisitante(visitantes.find(visitante => visitante.id == id))
    handleBtnVerMas()
  }

  const handleModificar = (id) => {
    // Lógica para modificar un visitante
  };

  const handleDesactivar = (id) => {
    try {
      desactivarVisitante(id).then(()=>{
        Alert.alert("Visitante desactivado con éxito!");
        setVisitantes(visitantes.filter((visitante) => visitante.id !== id));
      })
    } catch (error) {
      Alert.alert("No se pudo desactivar al visitante: " + error);
    }
  };

  useEffect(() => {
    try{
      obtenerVisitantes()
      .then((listaVisitantes) => {
        setVisitantes(listaVisitantes)
      })
    }catch(error){
      Alert.alert("Hubo un error al cargar los visitantes: " + error)
    }

  }, []);

  return (
    <ContenedorVista>
      {/** Controlador del CRUD */}
      <View style={stylesVistaAdmin.controladorContainer}>
        <Boton styles={stylesVistaAdmin.controladorBtn} onPress={() => router.navigate(REGISTRO_DE_VISITANTES)}>
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
          <Text style={stylesVistaAdmin.cardText}>Categoria</Text>
          <Text style={stylesVistaAdmin.cardText}>Institutos</Text>
          <Text style={{ flex: 0.3 }}></Text>
        </View>
        {visitantes.map((visitante, index) => (
          <View style={stylesVistaAdmin.cardLista} key={visitante.id}>
            <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>{index+1}</Text>
            <Text style={stylesVistaAdmin.cardText}>{`${visitante.nombre} ${visitante.apellido}`}</Text>
            <Text style={stylesVistaAdmin.cardText}>{visitante.categoria?.nombre.toUpperCase()}</Text>
            <Text style={stylesVistaAdmin.cardText}>{institutosToString(visitante.institutos)}</Text>
            {modificar && (
              <Ionicons
                name='pencil-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "orange" }]}
                onPress={() => handleModificar(visitante.id)}
              />
            )}
            {desactivar && (
              <Ionicons
                name='trash-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "red" }]}
                onPress={() => handleDesactivar(visitante.id)}
              />
            )}
            {!modificar && !desactivar && (
              <Ionicons
                name='eye-sharp'
                style={[stylesVistaAdmin.cardIcon, { color: "white" }]}
                onPress={() => handleVerMas(visitante.id)}
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
                  <Text style={stylesVistaAdmin.modalText}>{visitante.nombre}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Apellido: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{visitante.apellido}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>DNI: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{visitante.dni}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Email: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{visitante.email}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Categoria: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{visitante.categoria?.nombre.toUpperCase()}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Institutos: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{institutosToString(visitante.institutos)}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Lugares: </Text>
                  <Text style={[stylesVistaAdmin.modalText, {flexWrap: "wrap", maxWidth: "50%"}]}>{lugaresToString(visitante.lugares)}</Text>
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


export default VisitantesAdmin;

import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ContenedorVista from '@/ui/ContenedorVista';
import Boton from '@/components/Boton';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import * as SvInstituto from '@/store/institutoService'
import arrayToString from '../../../util/arrayToString';
import { desactivarInstituto } from '../../../store/institutoService';

import { observer } from '@legendapp/state/react'

import { stylesVistaAdmin } from '@/styles/styles';

const InstitutosAdmin = observer(() => {
  const [verMas, setVerMas] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [desactivar, setDesactivar] = useState(false);

  const [instituto, setInstituto] = useState(null);
  const [institutos, setInstitutos] = useState([]);

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
    setInstituto(institutos.find(instituto => instituto.id == id))
    handleBtnVerMas()
  }

  const handleModificar = (id) => {
    // Lógica para modificar un instituto
  };

  const handleDesactivar = (id) => {
    // setInstitutos(institutos.filter((instituto) => instituto.id !== id));
    // Lógica para desactivar un instituto
    try {
      desactivarInstituto(id).then(() => {
        Alert.alert("Se dio de baja el instituto")
        setInstitutos(institutos.filter((instituto) => instituto.id !== id));
      })
    } catch (error) {
      Alert.alert("No se pudo dar de baja el instituto: " + error)
    }

  };

  useEffect(() => {
      try{
        SvInstituto.obtenerInstitutos().then((institutos) => {
          setInstitutos(institutos)
        })

      }catch(error){
        Alert.alert("No se pudo cargar los institutos: " + error)
      }      
  }, []);

  return (
    <ContenedorVista>
      {/** Controlador del CRUD */}
      <View style={stylesVistaAdmin.controladorContainer}>
        <Boton styles={stylesVistaAdmin.controladorBtn} onPress={() => router.navigate("/(admin)/institutos/registro")}>
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
        {institutos.map((instituto, index) => (
          <View style={stylesVistaAdmin.cardLista} key={instituto.id}>
            <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>{index + 1}</Text>
            <Text style={stylesVistaAdmin.cardText}>{instituto.nombre}</Text>
            {modificar && (
              <Ionicons
                name='pencil-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "orange" }]}
                onPress={() => handleModificar(instituto.id)}
              />
            )}
            {desactivar && (
              <Ionicons
                name='trash-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "red" }]}
                onPress={() => handleDesactivar(instituto.id)}
              />
            )}
            {!modificar && !desactivar && (
              <Ionicons
                name='eye-sharp'
                style={[stylesVistaAdmin.cardIcon, { color: "white" }]}
                onPress={() => handleVerMas(instituto.id)}
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
                  <Text style={stylesVistaAdmin.modalText}>{instituto.nombre}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Descripcion: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{instituto.descripcion}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Lugares: </Text>
                  <Text style={stylesVistaAdmin.modalText}>
                    {arrayToString(instituto.lugares)}
                  </Text>
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
}
)

export default InstitutosAdmin;

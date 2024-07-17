import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ContenedorVista from '@/ui/ContenedorVista';
import Boton from '@/components/Boton';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { obtenerRoles, desactivarRol } from '@/store/rolService';

import { stylesVistaAdmin } from '@/styles/styles';

const RolesAdmin = () => {
  const [verMas, setVerMas] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [desactivar, setDesactivar] = useState(false);

  const [rol, setRol] = useState(null);
  const [roles, setRoles] = useState([]);

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
    setRol(roles.find(roles => roles.id == id))
    handleBtnVerMas()
  }

  const handleModificar = (id) => {
    // Lógica para modificar un roles
  };

  const handleDesactivar = (id) => {
    // Lógica para desactivar un rol
    try {
      desactivarRol(id).then(() => {
        Alert.alert("Se dio de baja el Rol")
        setRoles(roles.filter((rol) => rol.id !== id));
      })
    } catch (error) {
      Alert.alert("No se pudo dar de baja el instituto: " + error)
    }

  };

  useEffect(() => {
    try {
      obtenerRoles()
        .then((listaroles) => setRoles(listaroles))
    } catch (error) {
      Alert.alert("No se pudieron cargar los roles: " + error)
    }
  }, []);

  return (
    <ContenedorVista>
      {/** Controlador del CRUD */}
      <View style={stylesVistaAdmin.controladorContainer}>
        <Boton styles={stylesVistaAdmin.controladorBtn} onPress={() => router.navigate("/(admin)/roles/registro")}>
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
        {roles.map((rol, index) => (
          <View style={stylesVistaAdmin.cardLista} key={rol.id}>
            <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>{index+1}</Text>
            <Text style={stylesVistaAdmin.cardText}>{rol.nombre}</Text>
            {modificar && (
              <Ionicons
                name='pencil-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "orange" }]}
                onPress={() => handleModificar(rol.id)}
              />
            )}
            {desactivar && (
              <Ionicons
                name='trash-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "red" }]}
                onPress={() => handleDesactivar(rol.id)}
              />
            )}
            {!modificar && !desactivar && (
              <Ionicons
                name='eye-sharp'
                style={[stylesVistaAdmin.cardIcon, { color: "white" }]}
                onPress={() => handleVerMas(rol.id)}
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
                  <Text style={stylesVistaAdmin.modalText}>{rol.nombre}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Descripcion: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{rol.descripcion}</Text>
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

export default RolesAdmin;

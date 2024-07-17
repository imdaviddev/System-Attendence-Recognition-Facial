import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ContenedorVista from '@/ui/ContenedorVista';
import Boton from '@/components/Boton';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { REGISTRO_DE_EMPRESAS } from '@/routes/routes'
import { obtenerEmpresas } from '@/store/empresaService';
import { desactivarEmpresa } from '@/store/empresaService';

import { stylesVistaAdmin } from '@/styles/styles';

const EmpresasAdmin = () => {
  const [verMas, setVerMas] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [desactivar, setDesactivar] = useState(false);

  const [empresa, setEmpresa] = useState(null);
  const [empresas, setEmpresas] = useState([]);

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
    setEmpresa(empresas.find(empresas => empresas.id == id))
    handleBtnVerMas()
  }

  const handleModificar = (id) => {
    // Lógica para modificar un empresas
  };

  const handleDesactivar = (id) => {
    // Lógica para desactivar una empresa
    try {
      desactivarEmpresa(id).then(() => {
        Alert.alert("Se dio de baja la empresa")
        setEmpresas(empresas.filter((empresas) => empresas.id !== id));
      })
    } catch (error) {
      Alert.alert("No se pudo dar de baja el empresa: " + error)
    }
  };

  useEffect(() => {
    try {
      obtenerEmpresas()
        .then((listaEmpresas) => {
          setEmpresas(listaEmpresas)
        })
    } catch (error) {
      Alert.alert("No se pudo cargar las empresas: " + error)
    }

  }, []);

  return (
    <ContenedorVista>
      {/** Controlador del CRUD */}
      <View style={stylesVistaAdmin.controladorContainer}>
        <Boton styles={stylesVistaAdmin.controladorBtn} onPress={() => router.navigate("/(admin)/empresas/registro")}>
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
          <Text style={stylesVistaAdmin.cardText}>Direccion</Text>
          <Text style={{ flex: 0.3 }}></Text>
        </View>
        {empresas.map((empresa, index) => (
          <View style={stylesVistaAdmin.cardLista} key={empresa.id}>
            <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>{index+1}</Text>
            <Text style={stylesVistaAdmin.cardText}>{empresa.nombre}</Text>
            <Text style={stylesVistaAdmin.cardText}>{empresa.direccion}</Text>
            {modificar && (
              <Ionicons
                name='pencil-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "orange" }]}
                onPress={() => handleModificar(empresa.id)}
              />
            )}
            {desactivar && (
              <Ionicons
                name='trash-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "red" }]}
                onPress={() => handleDesactivar(empresa.id)}
              />
            )}
            {!modificar && !desactivar && (
              <Ionicons
                name='eye-sharp'
                style={[stylesVistaAdmin.cardIcon, { color: "white" }]}
                onPress={() => handleVerMas(empresa.id)}
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
                  <Text style={stylesVistaAdmin.text}>Nombre: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{empresa.nombre}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.text}>Descripcion: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{empresa.descripcion}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.text}>Direccion: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{empresa.direccion}</Text>
                </View>
              </View>
              <TouchableOpacity style={stylesVistaAdmin.modalBtnCerrar} onPress={() => setVerMas(false)}>
                <Text style={stylesVistaAdmin.text}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

    </ContenedorVista>
  );
};

export default EmpresasAdmin;

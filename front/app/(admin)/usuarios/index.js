import React, { useState, useEffect } from 'react';
import { View, Text, styleheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ContenedorVista from '@/ui/ContenedorVista';
import Boton from '@/components/Boton';
import {TouchableOpacity} from 'react-native';
import { router } from 'expo-router';
import { REGISTRO_DE_USUARIOS } from '@/routes/routes'
import { arrayToStringPerValue } from '@/util/arrayToString';

import { obtenerUsuarios } from '@/store/usuarioService';
import institutosToString from '@/helpers/institutosToString';
import lugaresToString from '@/helpers/lugaresToString';
import { desactivarUsuario } from '@/store/usuarioService';
import { stylesVistaAdmin } from '@/styles/styles';

const UsuariosAdmin = () => {
  const [verMas, setVerMas] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [desactivar, setDesactivar] = useState(false);

  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

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
    setUsuario(usuarios.find(usuario => usuario.id == id))
    handleBtnVerMas()
  }

  const handleModificar = (id) => {
    // Lógica para modificar un usuario
  };

  const handleDesactivar = (id) => {
    try {
      desactivarUsuario(id).then(()=>{
        Alert.alert("usuario desactivado con éxito!");
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      })
    } catch (error) {
      Alert.alert("No se pudo desactivar al usuario: " + error);
    }
  };

  useEffect(() => {
    try{
      obtenerUsuarios()
      .then((listausuarios) => {
        setUsuarios(listausuarios)
      })
    }catch(error){
      Alert.alert("Hubo un error al cargar los usuarios: " + error)
    }

  }, []);

  return (
    <ContenedorVista>
      {/** Controlador del CRUD */}
      <View style={stylesVistaAdmin.controladorContainer}>
        <Boton styles={stylesVistaAdmin.controladorBtn} onPress={() => router.navigate("/(admin)/usuarios/registro")}>
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
          <Text style={{ flex: 0.3 }}></Text>
        </View>
        {usuarios.map((usuario, index) => (
          <View style={stylesVistaAdmin.cardLista} key={usuario.id}>
            <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>{index+1}</Text>
            <Text style={stylesVistaAdmin.cardText}>{`${usuario.nombre} ${usuario.apellido}`}</Text>
            <Text style={stylesVistaAdmin.cardText}>{usuario.categoria?.nombre.toUpperCase()}</Text>
            {modificar && (
              <Ionicons
                name='pencil-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "orange" }]}
                onPress={() => handleModificar(usuario.id)}
              />
            )}
            {desactivar && (
              <Ionicons
                name='trash-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "red" }]}
                onPress={() => handleDesactivar(usuario.id)}
              />
            )}
            {!modificar && !desactivar && (
              <Ionicons
                name='eye-sharp'
                style={[stylesVistaAdmin.cardIcon, { color: "white" }]}
                onPress={() => handleVerMas(usuario.id)}
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
                  <Text style={stylesVistaAdmin.modalText}>{usuario.nombre}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Apellido: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{usuario.apellido}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>DNI: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{usuario.dni}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Email: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{usuario.email}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Categoria: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{usuario.categoria?.nombre.toUpperCase()}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Institutos: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{institutosToString(usuario.institutos)}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Lugares: </Text>
                  <Text style={[stylesVistaAdmin.modalText, {flexWrap: "wrap", maxWidth: "50%"}]}>{lugaresToString(usuario.lugares)}</Text>
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


export default UsuariosAdmin;

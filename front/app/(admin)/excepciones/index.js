import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ContenedorVista from '@/ui/ContenedorVista';
import Boton from '@/components/Boton';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { desactivarExcepcion, obtenerExcepciones } from '@/store/excepcionService';
import lugaresToString from '@/helpers/lugaresToString'

import { observer } from '@legendapp/state/react'

import { stylesVistaAdmin } from '@/styles/styles';

const ExcepcionesAdmin = observer(() => {
  const [verMas, setVerMas] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [desactivar, setDesactivar] = useState(false);

  const [excepcion, setExcepcion] = useState(null);
  const [excepciones, setExcepciones] = useState([]);

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
    setExcepcion(excepciones.find(excepcion => excepcion.id == id))
    handleBtnVerMas()
  }

  const handleModificar = (id) => {
    // Lógica para modificar un excepcion
  };

  const handleDesactivar = (id) => {
    // setExcepciones(excepciones.filter((excepcion) => excepcion.id !== id));
    // Lógica para desactivar un excepcion
    try {
      desactivarExcepcion(id).then(() => {
        Alert.alert("Se dio de baja el excepcion")
        setExcepciones(excepciones.filter((excepcion) => excepcion.id !== id));
      })
    } catch (error) {
      Alert.alert("No se pudo dar de baja el excepcion: " + error)
    }

  };

  useEffect(() => {
    obtenerExcepciones()
      .then((listaexcepciones) => setExcepciones(listaexcepciones))
      .catch(() => console.log("No se pudo cargar los excepciones"));
  }, []);

  return (
    <ContenedorVista>
      {/** Controlador del CRUD */}
      <View style={[stylesVistaAdmin.controladorContainer]}>
        <Boton styles={[stylesVistaAdmin.controladorBtn, {width: 150, height: 60}]} onPress={() => router.navigate("/(admin)/excepciones/registro")}>
          <Text style={stylesVistaAdmin.controladorText}>Alta</Text>
        </Boton>
        <Boton
          onPress={handleBtnModificar}
          styles={[stylesVistaAdmin.controladorBtn, modificar && { backgroundColor: "orange" }, {width: 150, height: 60}]}>
          <Text style={stylesVistaAdmin.controladorText}>Modificar</Text>
        </Boton>
        <Boton
          onPress={handleBtnDesactivar}
          styles={[stylesVistaAdmin.controladorBtn, desactivar && { backgroundColor: "red" }, {width: 150, height: 60}]}>
          <Text style={stylesVistaAdmin.controladorText}>Desactivar</Text>
        </Boton>
      </View>

      {/** Lista */}
      <View style={stylesVistaAdmin.lista}>
        <View style={stylesVistaAdmin.cardLista}>
          <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>ID</Text>
          <Text style={stylesVistaAdmin.cardText}>Nombre</Text>
          <Text style={stylesVistaAdmin.cardText}>CATEGORIA</Text>
          <Text style={{ flex: 0.3 }}></Text>
        </View>
        {excepciones.map((excepcion, index) => (
          <View style={stylesVistaAdmin.cardLista} key={excepcion.id}>
            <Text style={[stylesVistaAdmin.cardText, { flex: 0.3 }]}>{index + 1}</Text>
            <Text style={stylesVistaAdmin.cardText}>{excepcion.nombre}</Text>
            <Text style={stylesVistaAdmin.cardText}>{excepcion.categoria.nombre}</Text>

            {modificar && (
              <Ionicons
                name='pencil-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "orange" }]}
                onPress={() => handleModificar(excepcion.id)}
              />
            )}
            {desactivar && (
              <Ionicons
                name='trash-outline'
                style={[stylesVistaAdmin.cardIcon, { color: "red" }]}
                onPress={() => handleDesactivar(excepcion.id)}
              />
            )}
            {!modificar && !desactivar && (
              <Ionicons
                name='eye-sharp'
                style={[stylesVistaAdmin.cardIcon, { color: "white" }]}
                onPress={() => handleVerMas(excepcion.id)}
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
                  <Text style={stylesVistaAdmin.modalText}>{excepcion.nombre}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={[stylesVistaAdmin.modalText, {maxWidth: "50%"}]}>Descripcion: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{excepcion.descripcion}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Fecha de Inicio: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{excepcion.fechaInicio}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Fecha de cierre: </Text>
                  <Text style={stylesVistaAdmin.modalText}>{excepcion.fechaCierre}</Text>
                </View>
                <View style={stylesVistaAdmin.modalDetalleFila}>
                  <Text style={stylesVistaAdmin.modalText}>Lugares: </Text>
                  <Text style={stylesVistaAdmin.modalText}>
                    {lugaresToString(excepcion.lugares)}
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

export default ExcepcionesAdmin;

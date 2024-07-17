import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native';
import { router } from 'expo-router';
import { crearRol } from '@/store/rolService';
import { obtenerLugares } from '@/store/lugarService';
import { stylesVistaRegistro } from '@/styles/styles'; 

const CampoForm = ({ value, onChangeText, fieldName }) => {
  return (
    <View style={stylesVistaRegistro.fieldContainer}>
      <Text style={stylesVistaRegistro.label}>{fieldName.toUpperCase()}</Text>
      <TextInput
        style={stylesVistaRegistro.input}
        placeholder={`Ingrese su ${fieldName.toLowerCase()}`}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const RegistroDeRoles = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [lugaresSeleccionados, setLugaresSeleccionados] = useState([]);

  const [lugares, setLugares] = useState([]);
  useEffect(() => {
    try{
      obtenerLugares().then(lugares => setLugares(lugares))
    }catch(error){
      Alert.alert("Hubo un error al obtener lugares: " + error)
    }
  }, [])

  const registrarRol = () => {
    try{
      crearRol({
        nombre: nombre,
        descripcion: descripcion,
        lugares: lugaresSeleccionados,
      })
    }catch(error){
      Alert.alert("No se pudo registrar el rol: " + error)
    }
     //Alert.alert("No validamos datos, por falta de tiempo se guarda lo que envia");
     router.navigate("/admin")
  }

  return (
    <ScrollView style={stylesVistaRegistro.container}>
      <View style={{paddingTop: 40, paddingHorizontal: 20}}>
        <CampoForm value={nombre} onChangeText={setNombre} fieldName="nombre" />
        <CampoForm value={descripcion} onChangeText={setDescripcion} fieldName="descripcion" />

        <View style={[stylesVistaRegistro.fieldContainer]}>
          <Text style={stylesVistaRegistro.label}>LUGARES</Text>
          <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
            {lugares.map((lugar) => (
              <View key={lugar.id} style={stylesVistaRegistro.checkboxContainer}>
                <Checkbox
                  value={lugaresSeleccionados.some(selectedLugar => selectedLugar.id === lugar.id)}
                  onValueChange={(newValue) => {
                    const nuevosLugaresSeleccionados = [...lugaresSeleccionados];
                    if (newValue === false) {
                      const index = nuevosLugaresSeleccionados.findIndex(selectedLugar => selectedLugar.id === lugar.id);
                      if (index !== -1) {
                        nuevosLugaresSeleccionados.splice(index, 1);
                      }
                    } else {
                      nuevosLugaresSeleccionados.push(lugar);
                    }
                    setLugaresSeleccionados(nuevosLugaresSeleccionados);
                  }}
                  color="#800080"
                  style={stylesVistaRegistro.checkbox}
                />
                <Text style={stylesVistaRegistro.label}>{lugar.nombre}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={stylesVistaRegistro.fieldContainer}>
          <Button title='REGISTRAR' onPress={registrarRol}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistroDeRoles;

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

const RegistroDeLugares = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const registrarLugar = () => {
    try{
      crearRol({
        nombre: nombre,
        descripcion: descripcion,
      }).then(() => {
         Alert.alert("Se creo el Lugar con exito!");
        router.navigate("/admin")
      })
    }catch(error){
      Alert.alert("No se pudo registrar el rol: " + error)
    }
    
  }

  return (
    <ScrollView style={stylesVistaRegistro.container}>
      <View style={{paddingTop: 40, paddingHorizontal: 20}}>
        <CampoForm value={nombre} onChangeText={setNombre} fieldName="nombre" />
        <CampoForm value={descripcion} onChangeText={setDescripcion} fieldName="descripcion" />

        <View style={stylesVistaRegistro.fieldContainer}>
          <Button title='REGISTRAR' onPress={registrarLugar}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistroDeLugares;

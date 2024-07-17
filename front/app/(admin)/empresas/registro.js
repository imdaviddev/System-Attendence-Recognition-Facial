import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native';
import { router } from 'expo-router';
import { registrarEmpresa } from '@/store/empresaService';

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

const RegistroDeEmpresas = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleRegistrar = () => {
    try{
      registrarEmpresa({
        nombre: nombre,
        descripcion: descripcion,
        direccion: direccion
      })
      Alert.alert("Se registro la empresa con exito!");
      router.navigate("/admin")
    }catch(error){
      Alert.alert("No se pudo crear la empresa: " + error)
    }
     
  }

  return (
    <ScrollView style={stylesVistaRegistro.container}>
      <View style={{paddingTop: 40, paddingHorizontal: 20}}>
        <CampoForm value={nombre} onChangeText={setNombre} fieldName="nombre" />
        <CampoForm value={direccion} onChangeText={setDireccion} fieldName="direccion" />
        <CampoForm value={descripcion} onChangeText={setDescripcion} fieldName="descripcion" />
        
        <View style={stylesVistaRegistro.fieldContainer}>
          <Button title='REGISTRAR' onPress={handleRegistrar}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistroDeEmpresas;

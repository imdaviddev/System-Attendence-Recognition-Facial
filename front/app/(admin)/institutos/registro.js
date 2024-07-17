import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native';
import { router } from 'expo-router';

import { obtenerLugares } from '@/store/lugarService'
import { crearInstituto } from '@/store/institutoService';

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


export function ImageViewer({ placeholderImageSource, selectedImage, style }) {
  const imageSource = selectedImage ? { uri: selectedImage } : undefined;
  return <Image source={imageSource} style={style} />;
}

const RegistroDeInstitutos = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [lugaresSeleccionados, setLugaresSeleccionados] = useState([]);

  const [lugares, setLugares] = useState([]);
  useEffect(() => {
    try{
      obtenerLugares().then(lugares => setLugares(lugares))
    }catch(error){
      Alert.alert("No se pudieron cargar los lugares: " + error)
    }
  }, [])

  const registrarInstituto = () => {
    try {
      //Alert.alert("No validamos datos, por falta de tiempo se guarda lo que envia");
      crearInstituto({
        nombre: nombre,
        descripcion: descripcion,
        lugares: lugaresSeleccionados

      }).then(() => {
        Alert.alert("Se creo con exito el instituto.")
        router.navigate("/admin")
      })
    } catch (error) {
      Alert.alert("No se pudo crear el instituto: " + error)
    }
  }

  return (
    <ScrollView style={stylesVistaRegistro.container}>
      <View style={{ paddingTop: 40, paddingHorizontal: 20 }}>
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
          <Button title='REGISTRAR' onPress={registrarInstituto} />
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistroDeInstitutos;

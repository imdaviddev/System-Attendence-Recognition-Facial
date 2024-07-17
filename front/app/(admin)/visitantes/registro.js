import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native';
import elegirUnaFoto from '@/util/elegirUnaFoto';
import { router } from 'expo-router';

import { obtenerLugares } from '@/store/lugarService';
import { obtenerEmpresas } from '@/store/empresaService';
import { obtenerInstitutos } from '@/store/institutoService';
import { obtenerCategorias } from '@/store/categoriaService';
import { crearVisitante } from '@/store/visitanteService';

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

const RegistroDeVisitantes = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState({ nombre: "interno" });
  const [instituto, setInstituto] = useState({});
  const [institutosSeleccionados, setIntitutosSeleccionados] = useState([])
  const [empresa, setEmpresa] = useState({});
  const [lugaresSeleccionados, setLugaresSeleccionados] = useState([]);
  const [imagen, setImagen] = useState();

  const [categorias, setCategorias] = useState([]);
  const [institutos, setInstitutos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    try {
      obtenerCategorias().then(categorias => setCategorias(categorias))
      obtenerInstitutos().then(institutos => setInstitutos(institutos))
      obtenerEmpresas().then(empresas => setEmpresas(empresas))
      obtenerLugares().then(lugares => setLugares(lugares))
    } catch (error) {
      Alert.alert("Hubo un error al cargar los valores del formulario: " + error)
    }
  }, [])

  const elegirFoto = () => {
    elegirUnaFoto().then(result => setImagen(result.assets[0].uri))
  }

  const registrarVisitante = () => {
    try {
      console.log(instituto)
      crearVisitante({
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        email: email,
        categoria: categoria,
        institutos: institutosSeleccionados,
        empresa: empresa,
        lugares: lugaresSeleccionados,
        imagen: imagen,
      }).then(() => {
        Alert.alert("Se dio de alta al Visitante con exito!")
        router.navigate("/admin")
      })

    } catch (error) {
      Alert.alert("No se pudo dar de alta al Visitante: " + error)
      console.log(error)
    }

  }

  return (
    <ScrollView style={stylesVistaRegistro.container}>
      <View style={{ paddingTop: 40, paddingHorizontal: 20 }}>
        <CampoForm value={nombre} onChangeText={setNombre} fieldName="nombre" />
        <CampoForm value={apellido} onChangeText={setApellido} fieldName="apellido" />
        <CampoForm value={dni} onChangeText={setDni} fieldName="dni" />
        <CampoForm value={email} onChangeText={setEmail} fieldName="email" />
        <View style={stylesVistaRegistro.fieldContainer}>
          <Text style={stylesVistaRegistro.label}>CATEGORIA</Text>
          <Picker
            style={[{ backgroundColor: "white", flex: 1, borderRadius: 20 }]}
            selectedValue={categoria}
            onValueChange={(categoria) => setCategoria(categoria)}
            mode="dropdown">
            {
              categorias?.map((item) => <Picker.Item key={item.nombre} label={item.nombre.toUpperCase()} value={item} />)
            }
          </Picker>
        </View>
        {categoria.nombre.toLowerCase() === "interno" &&
          <View style={[stylesVistaRegistro.fieldContainer]}>
            <Text style={stylesVistaRegistro.label}>INSTITUTOS</Text>
            <Picker
              style={[{ backgroundColor: "white", flex: 1, borderRadius: 20 }]}
              selectedValue={instituto}
              onValueChange={(instituto) => {
                setInstituto(instituto);
                const institutoIndex = institutosSeleccionados.findIndex(item => item.nombre === instituto.nombre);
                if (institutoIndex !== -1) {
                  const nuevosInstitutosSeleccionados = [...institutosSeleccionados];
                  nuevosInstitutosSeleccionados.splice(institutoIndex, 1);
                  setIntitutosSeleccionados(nuevosInstitutosSeleccionados);
                } else {
                  setIntitutosSeleccionados([...institutosSeleccionados, instituto]);
                }
              }}
              mode="dialog">
              {
                institutos?.map((item) => <Picker.Item key={item.nombre} label={item.nombre} value={item} />)
              }
            </Picker>
            <View style={{flexDirection: "row", flexWrap: "wrap", paddingTop: 15, gap: 10, alignItems: "center"}}>
              <Text style={[stylesVistaRegistro.label, {padding: 5}]}>Seleccionados: </Text>
              {institutosSeleccionados?.map((item) => (
                <Text style={[stylesVistaRegistro.label,{backgroundColor: "orange", borderRadius: 10, padding: 5}]} key={item.nombre}>{item.nombre}</Text>
              ))}
            </View>
          </View>
        }

        {categoria.nombre.toLowerCase() === "externo" &&
          <View style={[stylesVistaRegistro.fieldContainer]}>
            <Text style={[stylesVistaRegistro.label]}>EMPRESA</Text>
            <Picker
              style={[{ backgroundColor: "white", flex: 1, borderRadius: 20 }]}
              selectedValue={empresa}
              onValueChange={(empresa) => setEmpresa(empresa)}
              mode="dropdown">
              {
                empresas?.map((item) => <Picker.Item key={item.nombre} label={item.nombre} value={item} />)
              }
            </Picker>
          </View>
        }
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
          <Text style={stylesVistaRegistro.label}>IMAGEN</Text>
          <Button title='SELECCIONAR' onPress={elegirFoto} />
          <View style={[stylesVistaRegistro.imageContainer, { marginTop: 10, alignItems: "center", justifyContent: "center", width: "100%" }]}>
            <Image source={{ uri: imagen }} style={stylesVistaRegistro.imagenView} />
          </View>
        </View>

        <View style={stylesVistaRegistro.fieldContainer}>
          <Button title='REGISTRAR' onPress={registrarVisitante} />
        </View>
      </View>
    </ScrollView>
  );
};


export default RegistroDeVisitantes;

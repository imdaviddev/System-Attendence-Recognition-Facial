import { Text, TouchableOpacity, TextInput, View, Alert } from 'react-native'
import React from 'react'
import { CameraView } from 'expo-camera' 
import { useRef } from 'react'
import { takePicture } from '@/util/takePicture'
import { router } from 'expo-router'
import { useState } from 'react'

const ip = ""
const registrarImagen = `http:${ip}/registrarImagen`

const Login = () => {
  const cameraRef = useRef<any>()
  const [rol, setRol] = useState('')

  const handleAutenticacion = () => {
    // Si no hay internet deberia dejarlo loguearse con alguna contraseña offline    
    takePicture(cameraRef).then((foto) =>{console.log(foto)})
    Alert.alert("Bienvenido: " + rol)
    // Dependiendo del rol ira hacia el menu de admin, o hacia el menu de seguridad
    if(rol.toUpperCase() == "ADMIN" || rol == "admin"){
      router.navigate("/(admin)/admin")
    }else {
      router.navigate("/(seguridad)/seguridad")
    }
  }

  return (
    <CameraView 
      ref={cameraRef}
      facing='front'
      mode='picture' 
      style={{padding: 30, flex: 1, alignItems: "center", justifyContent: "flex-end"} }>


      <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
        <TextInput style={{width: 300, height: 40, backgroundColor: "white", borderRadius: 5, paddingHorizontal: 20}} placeholder='Nombre de Usuario' onChangeText={(valor) => setRol(valor)}/>
        <TouchableOpacity 
          onPress={handleAutenticacion}
          style={{backgroundColor: "black", padding: 10, width: 150, height: 50, borderRadius: 10, borderColor: "white", borderWidth: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{textAlign: "center", color: "white"}}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>


    </CameraView>
  )
}

export default Login
import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CameraView } from 'expo-camera' 
import { useRef } from 'react'
import { takePicture } from '@/util/takePicture'
import { router } from 'expo-router'

const Autenticar = () => {
  const cameraRef = useRef<any>()

  const handleAutenticacion = () => {
    takePicture(cameraRef).then((foto) =>{console.log(foto)})
    // Dependiendo de si esta o no auterizado hara una o otra
    // Si no esta auterizado se le dara un mensaje de usaurio no autorizado
    // Si esta auterizado, mostrara la card del visitante, y se le dara el alta del dia en el backend
    router.navigate("/(seguridad)/seguridad")
  }

  return (
    <CameraView 
      ref={cameraRef} 
      facing='front'
      mode='picture'
      style={{padding: 30, flex: 1, alignItems: "center", justifyContent: "flex-end"} }>

      <TouchableOpacity 
        onPress={handleAutenticacion}
        style={{backgroundColor: "black", padding: 10, borderRadius: 10, borderColor: "white", borderWidth: 1}}>
        <Text style={{textAlign: "center", color: "white"}}>Autenticar</Text>
      </TouchableOpacity>
    </CameraView>
  )
}

export default Autenticar
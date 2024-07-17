import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Inicio = () => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#000051", padding: 40}}>
      <View style={{flex: 1, alignContent: "center", justifyContent: "center"}}>
        <Text style={{color: "white", fontSize: 40, fontWeight: "200"}}>Ace Detect Attendempse</Text>
      </View>

      <TouchableOpacity 
        onPress={() => router.navigate("/login")}
        style={{backgroundColor: "black", borderRadius: 10, borderColor: "white", borderWidth: 1, padding: 20}}>
        <Text style={{textAlign: "center", color: "white"}}>Iniciar Sesion</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Inicio
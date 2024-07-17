import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Menu = () => {
  return (
    <View style={{flex: 1, padding: 20, alignItems: "center", backgroundColor: "#00005133"}}>
        <View style={{flex: 1}}></View>

        <View style={styles.menu}>
                <View style={styles.fila}>
                <TouchableOpacity style={styles.col}>
                    <Text style={styles.text}>Administracion de Visitantes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.col}>
                    <Text style={styles.text}>Administracion de Usuarios</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fila}>
                <TouchableOpacity style={styles.col}>
                    <Text style={styles.text}>Administracion de Institutos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.col}>
                    <Text style={styles.text}>Administracion de Empresas</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={{flex: 1}}></View>
    </View>
  )
}

const styles =StyleSheet.create({
    menu: {
        gap: 20,
        flex: 4,
    },
    fila: {
        flexDirection: "row",
        gap: 20,
        flex: 0.2
    },
    col: {
        flex: 1,
        backgroundColor: "black",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 3
    },
    text: {
        color: "white",
        textAlign: "center",
        textAlignVertical: "center"
    }

})

export default Menu
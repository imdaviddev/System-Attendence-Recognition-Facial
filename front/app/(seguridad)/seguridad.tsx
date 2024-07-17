import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { Columna, Fila, Menu } from '@/ui/Menu/Menu'
import Boton from '@/components/Boton'
import { router } from 'expo-router'
import ContenedorVista from '@/ui/ContenedorVista'
import { AUTENTICAR_VISITANTES } from '@/routes/routes'

const MenuSeguridad = () => {


    return (
        <View style={{ padding: 20, paddingTop: 50, backgroundColor: "#000051", flex: 1 }}>
            <Menu>
                <Fila>
                    <Columna>
                        <Boton onPress={() => router.navigate(AUTENTICAR_VISITANTES)}>
                             <Text style={styles.text}>Autenticar Visitantes</Text>
                        </Boton>
                    </Columna>
                </Fila>
            </Menu>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        textAlign: "center",
        textAlignVertical: "center"
    }

})

export default MenuSeguridad
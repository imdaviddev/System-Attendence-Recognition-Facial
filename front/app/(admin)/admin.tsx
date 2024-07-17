import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { Columna, Fila, Menu } from '@/ui/Menu/Menu'
import Boton from '@/components/Boton'
import { router } from 'expo-router'
import ContenedorVista from '@/ui/ContenedorVista'
import { ADMINISTRACION_DE_CATEGORIAS, ADMINISTRACION_DE_EMPRESAS, ADMINISTRACION_DE_EXCEPCIONES, ADMINISTRACION_DE_INSTITUTOS, ADMINISTRACION_DE_LUGARES, ADMINISTRACION_DE_ROLES, ADMINISTRACION_DE_USUARIOS, ADMINISTRACION_DE_VISITANTES, HISTORIAL_DE_LOGS } from '@/routes/routes'

const MenuAdministrador = () => {

    return (
        <View style={{ padding: 20, paddingTop: 50, backgroundColor: "#000051", flex: 1 }}>
            <Menu>
                <Fila>
                    <Columna>
                        <Boton onPress={() => router.navigate(ADMINISTRACION_DE_VISITANTES)}>
                            <Text style={styles.text}>Administracion de Visitantes</Text>
                        </Boton>
                    </Columna>
                    <Columna>
                        <Boton onPress={() => router.navigate(ADMINISTRACION_DE_USUARIOS)}>
                            <Text style={styles.text}>Administracion de Usuarios</Text>
                        </Boton>
                    </Columna>
                </Fila>
                <Fila>
                    <Columna>
                        <Boton onPress={() => router.navigate(ADMINISTRACION_DE_INSTITUTOS)}>
                            <Text style={styles.text}>Administracion de Institutos</Text>
                        </Boton>
                    </Columna>
                    <Columna>
                        <Boton onPress={() => router.navigate(ADMINISTRACION_DE_EMPRESAS)}>
                            <Text style={styles.text}>Administracion de Empresas</Text>
                        </Boton>
                    </Columna>
                </Fila>
                <Fila>
                    <Columna>
                        <Boton onPress={() => router.navigate(ADMINISTRACION_DE_CATEGORIAS)}>
                            <Text style={styles.text}>Administracion de Categorias</Text>
                        </Boton>
                    </Columna>
                    <Columna>
                        <Boton onPress={() => router.navigate(ADMINISTRACION_DE_ROLES)}>
                            <Text style={styles.text}>Administracion de Roles</Text>
                        </Boton>
                    </Columna>
                </Fila>
                <Fila>
                    <Columna>
                        <Boton onPress={() => router.navigate(ADMINISTRACION_DE_LUGARES)}>
                            <Text style={styles.text}>Administracion de Lugares</Text>
                        </Boton>
                    </Columna>
                    <Columna>
                        <Boton onPress={() => router.navigate(ADMINISTRACION_DE_EXCEPCIONES)}>
                            <Text style={styles.text}>Administracion de Excepciones</Text>
                        </Boton>
                    </Columna>
                </Fila>
                <Fila>
                    <Columna>
                        <Boton onPress={() => router.navigate(HISTORIAL_DE_LOGS)}>
                            <Text style={styles.text}>Historial de Logs</Text>
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

export default MenuAdministrador
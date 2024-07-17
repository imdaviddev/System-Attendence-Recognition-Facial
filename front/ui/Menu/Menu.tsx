import { StyleSheet, View } from "react-native"
import React from 'react'

interface MenuProp {
    children: React.ReactNode
}

export const Menu: React.FC<MenuProp> = ({ children }) => {

    return <View style={styles.menu}>
        {children}
    </View>
}


interface MenuFilaProps {
    children: React.ReactNode
}

export const Fila: React.FC<MenuFilaProps> = ({ children }) => {
    return <View style={styles.fila}>
        {children}
    </View>
}

interface MenuColumnProps {
    children: React.ReactNode
}

export const Columna: React.FC<MenuColumnProps> = ({ children }) => {
    return <View style={styles.col}>
        {children}
    </View>
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        gap: 20
    },
    fila: {
        flexDirection: "row",
        gap: 20,
        flex: 0.2,
        
        width: "100%",
        height: "100%",
    },
    col: {
        flex: 1,
        backgroundColor: "black",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 3,
        paddingHorizontal: 10
    }

})

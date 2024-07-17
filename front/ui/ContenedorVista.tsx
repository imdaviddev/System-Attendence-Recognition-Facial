import { Text, ViewProps, SafeAreaView, View, ScrollView } from 'react-native'
import React from 'react'


interface Props{
    children: React.ReactNode
} 

const ContenedorVista: React.FC<Props> = ({children}) => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: "#00333f"}}>
      <View style={{ paddingTop: 40, paddingRight: 10, paddingLeft: 10, justifyContent: "center", alignItems: "center" }}>
        {children}
      </View>
    </ScrollView>
  )
}

export default ContenedorVista
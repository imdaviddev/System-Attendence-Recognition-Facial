import { StyleSheet } from 'react-native'

export const stylesVistaRegistro = StyleSheet.create({
  // Este estilo deber cambiarse luego
  container: {
    flex: 1,
    backgroundColor: '#00233f',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white"
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
  },

  imageContainer: {
    height: 300,
    width: 300
  },
  imagenView: {
    height: 300,
    width: 300
  },
});

export const stylesVistaAdmin = StyleSheet.create({
    /** Controlador */
    controladorContainer: {
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
      flex: 1,
      height: 60
    },
    controladorBtn: {
      backgroundColor: "black",
      borderRadius: 8,
      borderColor: "white",
      borderWidth: 1,
      minWidth: 100
    },
    controladorText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 10
    },
  
    /** Lista */
    lista: {
      width: "100%",
      flex: 9,
      margin: 10,
    },
    cardLista: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomColor: "white",
      borderBottomWidth: 1,
      paddingVertical: 20,
      alignItems: "center"
    },
    cardText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      textAlignVertical: "center",
      width: "100%",
      flex: 1
    },
    cardIcon: {
      flex: 0.3,
      height: 30,
      fontSize: 25,
      textAlign: "center",
      textAlignVertical: "center",
    },
  
    /** Modal */
    modalContainer: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContenido: {
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
      flexBasis: 500,
      minWidth: 300,
      justifyContent: "space-between",
      borderColor: "white",
      borderWidth: 2,
      backgroundColor: "black",
      paddingVertical: 20,
      margin: 15,
    },
    modalDetalle: {
      width: "100%",
      paddingHorizontal: 10,
      flex:1
    },
    modalDetalleFila: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 5,
      paddingVertical: 8,
      borderColor: "white",
      borderBottomWidth: 2,
      width: "100%",
      flex: 0.1
    },
    text:{
      color: "white",
      fontWeight: "bold",
      fontSize: 15
    },
    modalText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 15,
      width: "50%",
    },
    modalBtnCerrar: {
      backgroundColor: "black",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5
    }
  });

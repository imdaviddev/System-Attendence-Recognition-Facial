import { View, Text, Alert, Button, StyleSheet, TextInput} from 'react-native'
import { useState, useEffect } from 'react'
import ContenedorVista from '@/ui/ContenedorVista'
import Boton from '@/components/Boton'
import { Ionicons } from '@expo/vector-icons'
import pickDate from '@/util/pickDate'
import { router } from 'expo-router'
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';

import { obtenerLugares } from '@/store/lugarService'
import { obtenerCategorias } from '@/store/categoriaService'
import { registrarExcepcion } from '@/store/excepcionService'

import { stylesVistaRegistro } from '@/styles/styles'

const CampoForm = ({ value, onChangeText, fieldName }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{fieldName.toUpperCase()}</Text>
      <TextInput
        style={stylesVistaRegistro.input}
        placeholder={`Ingrese su ${fieldName.toLowerCase()}`}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const RegistroDeExcepciones = () => {
  // Manejo de las fechas de inicio y de cierre
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaInicio, setFechaInicio] = useState(new Date(Date.now()))
  const [fechaCierre, setFechaCierre] = useState(new Date(Date.now()))
  const [categorias, setLstaCategorias] = useState([])
  const [categoria, setCategoria] = useState({})
  const [lugares, setLugares] = useState([])
  const [lugaresSeleccionados, setLugaresSeleccionados] = useState([])

  const handleFechaIncio = () => { pickDate(fechaInicio, setFechaInicio) }
  const handleFechaCierre = () => { pickDate(fechaCierre, setFechaCierre) }

  useEffect(() => {
    try{
        obtenerCategorias().then((lista) => { setLstaCategorias(lista) })
        obtenerLugares().then((lista) => { setLugares(lista) })
        console.log(categorias)
    }catch(error){
        Alert.alert("No se pudieron cargar los datos correctamente: " + error)
    }
  }, [])

  const handleTerminarRegistro = () => {
    try{
        registrarExcepcion({
            nombre: nombre,
            descripcion,
            fechaInicio: fechaInicio.toLocaleDateString(),
            fechaCierre: fechaCierre.toLocaleDateString(),
            categoria: categoria,
            lugares: lugaresSeleccionados,
        }).then(() => {
            Alert.alert("Se registro la excepcion con exito! ")
            router.navigate("/admin")
        })
    }catch(error){
        Alert.alert("No se pudo regisrar la excepcion: " + error)
        console.log("No se pudo regisrar la excepcion: " + error)

    }

  }

  return (
    <ContenedorVista>
      {/* Formulario */}
      {/** Datos pedidos en la card:
       * Fecha de inicio de fin de la excepcion
       * Poder elegir lugares entre todos los disponibles en el sistema
       */}
        <CampoForm value={nombre} onChangeText={setNombre} fieldName="nombre" />
        <CampoForm value={descripcion} onChangeText={setDescripcion} fieldName="descripcion" />

        {/** fieldContainer fecha de inicio */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>COLOQUE LA FECHA DE INICIO</Text>
          <Boton styles={[styles.inputDate, { gap: 5 }]} onPress={handleFechaIncio}>
            <Text style={{ color: "black", fontSize: 15 }}>{fechaInicio.toLocaleDateString()}</Text>
            <Ionicons name='calendar' color={"black"} size={20} />
          </Boton>
        </View>

        {/** fieldContainer fecha de Cierre */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>COLOQUE LA FECHA DE CIERRE</Text>
          <Boton styles={[styles.inputDate, { gap: 5 }]} onPress={handleFechaCierre}>
            <Text style={{ color: "black", fontSize: 15}}>{fechaCierre.toLocaleDateString()}</Text>
            <Ionicons name='calendar' color={"black"} size={20} />
          </Boton>
        </View>

        {/** fieldContainer seleccionar  categoria afectada */}
        <View style={[stylesVistaRegistro.fieldContainer, {width: "100%"}]}>
          <Text style={stylesVistaRegistro.label}>CATEGORIA</Text>
          <Picker
            style={[{ backgroundColor: "white", borderRadius: 20 }]}
            selectedValue={categoria}
            onValueChange={(categoria) => setCategoria(categoria)}
            mode="dialog">
            {
              categorias?.map((item) => <Picker.Item key={item.nombre} label={item.nombre.toUpperCase()} value={item} />)
            }
          </Picker>
        </View>

        {/** Selecionar los lugares a los que se le aplica la excepcion */}
        {/** fieldContainer seleccionar  categoria afectada */}
        <View style={[styles.fieldContainer, {flexDirection: 'column', flex: 1, alignItems: "center", marginBottom: 40, marginTop: 15}]}>
          <Text style={[styles.label, {justifyContent: "flex-start", width: 300, alignSelf: "flex-start", marginBottom: 10}]}>SELECCIONE LOS LUGARES</Text>
          {/* Renderizar el componente CheckboxList con la lista de lugares */}
          <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
            {lugares?.map((lugar) => (
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
          {/* Puedes usar lugaresSeleccionados para hacer algo con los lugares seleccionados */}
        </View>

      {/** Enviar Excepcion al backend */}
       <Button title={"Registrar Excepcion"} onPress={handleTerminarRegistro}/>
    </ContenedorVista>
  )
}

const styles = StyleSheet.create({
  fieldContainer: {
    flex: 1,
    width: "100%",
    margin: 5,
    gap: 10,

  },
  label: {
    color: "white",
    textAlign: "left",
    textVerticalAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  inputDate: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "space-between"
  },
})

export default RegistroDeExcepciones
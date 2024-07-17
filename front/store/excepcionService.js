import { state } from "@/store/state";
import { registrarOperacion } from "./logService";

async function registrarExcepcion(excepcion) {
    // Se va a fijar si está offline 
    // Si lo está, lo almacena localmente
    // Luego se subirá a la nube

    let excepcionesActuales = state.excepciones.get();
    let comprobarExcepcionExiste = excepcionesActuales.find((item) => item.nombre === excepcion.nombre);
    
    if (comprobarExcepcionExiste) {
        let nuevasExcepciones = excepcionesActuales.map(item => {
            if (item.nombre === excepcion.nombre) {
                registrarOperacion({
                    nombre: "Se reactivo una Excepcion: " +  item.nombre
                })
                return { ...item, isActive: true };
            }
            return item;
        });
        state.excepciones.set(nuevasExcepciones);
    } else {
        const nuevoID = state.id_excepciones.id.get();
        let nuevaExcepcion = { ...excepcion, isActive: true };
        nuevaExcepcion.id = nuevoID;
        
        state.excepciones.set([...excepcionesActuales, nuevaExcepcion]);
        state.id_excepciones.id.set(nuevoID + 1);

        registrarOperacion({
            nombre: "Se registro una nueva excepcion: " + nuevaExcepcion.nombre
        })
    }
}

async function desactivarExcepcion(id) {
    let excepcionesActuales = state.excepciones.get();
    let nuevasExcepciones = excepcionesActuales.map(item => {
        if (item.id === id) {
            registrarOperacion({
                nombre: "Se desactivo una Excepcion: " + item.nombre
            })
            return { ...item, isActive: false };
        }
        return item;
    });
    state.excepciones.set(nuevasExcepciones);
}

async function obtenerExcepciones() {
    let excepcionesActivos = state.excepciones.get().filter((item) => item.isActive);
    return excepcionesActivos;
}


export {
    registrarExcepcion,
    obtenerExcepciones,
    desactivarExcepcion,
}
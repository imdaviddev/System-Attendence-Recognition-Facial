import { state } from "@/store/state";
import { registrarOperacion } from "./logService";

async function crearLugar(lugar){
    // Se va a fijar si está offline 
    // Si lo está, lo almacena localmente
    // Luego se subirá a la nube

    let lugaresActuales = state.lugares.get();
    let comprobarLugarExiste = lugaresActuales.find((item) => item.nombre === lugar.nombre);
    
    if (comprobarLugarExiste) {
        let nuevosLugares = lugaresActuales.map(item => {
            if (item.nombre === lugar.nombre) {
                registrarOperacion({
                    nombre: "Se reactivo un lugar: " + item.nombre
                })
                return { ...item, isActive: true };
            }
            return item;
        });
        state.lugares.set(nuevosLugares);
    } else {
        const nuevoID = state.id_lugares.id.get();
        let nuevoLugar = { ...lugar, isActive: true };
        nuevoLugar.id = nuevoID;
        
        state.lugares.set([...lugaresActuales, nuevoLugar]);
        state.id_lugares.id.set(nuevoID + 1);

        registrarOperacion({
            nombre: "Se registro un lugar: " + nuevoLugar.nombre
        })
    }
}

async function desactivarLugar(id){
    let lugaresActuales = state.lugares.get();
    let nuevosLugares = lugaresActuales.map(item => {
        if (item.id === id) {
            registrarOperacion({
                nombre: "Desactivacion de Lugar: " + item.nombre
            })
            return { ...item, isActive: false };
        }
        return item;
    });
    state.lugares.set(nuevosLugares);
}

async function obtenerLugares(){
    let lugaresActivos = state.lugares.get().filter((item) => item.isActive);
    return lugaresActivos;
}

export {
    crearLugar,
    obtenerLugares,
    desactivarLugar,
}
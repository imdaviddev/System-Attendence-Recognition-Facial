import { state } from "@/store/state";
import { registrarOperacion } from "./logService";

async function crearVisitante(visitante) {
    // Se va a fijar si está offline 
    // Si lo está, lo almacena localmente
    // Luego se subirá a la nube

    let visitantesActuales = state.visitantes.get();
    let comprobarSiUsuarioExiste = visitantesActuales.find((item) => item.dni === visitante.dni);
    
    if (comprobarSiUsuarioExiste) {
        let actualizarVisitantes = visitantesActuales.map(item => {
            if (item.dni === visitante.dni) {
                return { ...item, isActive: true };
            }
            return item;
        });
        state.visitantes.set(actualizarVisitantes);
    } else {
        const nuevoID = state.id_visitante.id.get();
        let nuevoVisitante = { ...visitante, isActive: true };
        nuevoVisitante.id = nuevoID;
        
        state.visitantes.set([...visitantesActuales, nuevoVisitante]);
        state.id_visitante.id.set(nuevoID + 1);

        registrarOperacion({
            nombre: "Creacion de Visitante: " + nuevoVisitante.dni,
        })
    }
}

async function desactivarVisitante(id) {
    let visitantesActuales = state.visitantes.get();
    let actualizarVisitantes = visitantesActuales.map(item => {
        if (item.id === id) {
            registrarOperacion({
                nombre: "Desactivacion de visitante: " + item.dni
            })
            return { ...item, isActive: false };
        }
        return item;
    });
    state.visitantes.set(actualizarVisitantes);
}

async function obtenerVisitantes() {
    let visitantesACtivos = state.visitantes.get().filter((item) => item.isActive);
    return visitantesACtivos;
}


export {
    crearVisitante,
    obtenerVisitantes,
    desactivarVisitante,
}
import { state } from "@/store/state";
import { registrarOperacion } from "./logService";

async function crearInstituto(instituto) {
    // Se va a fijar si está offline 
    // Si lo está, lo almacena localmente
    // Luego se subirá a la nube

    let institutosActuales = state.institutos.get();
    let comprobarInstitutoExiste = institutosActuales.find((item) => item.nombre === instituto.nombre);
    
    if (comprobarInstitutoExiste) {
        let nuevosInstitutos = institutosActuales.map(item => {
            if (item.nombre === instituto.nombre) {
                registrarOperacion({
                    nombre: "Reactivacion de Intituto: " + item.nombre
                })

                return { ...item, isActive: true };
            }
            return item;
        });
        state.institutos.set(nuevosInstitutos);
    } else {
        const nuevoID = state.id_institutos.id.get();
        let nuevoInstituto = { ...instituto, isActive: true };
        nuevoInstituto.id = nuevoID;
        
        state.institutos.set([...institutosActuales, nuevoInstituto]);
        state.id_institutos.id.set(nuevoID + 1);

        registrarOperacion({
            nombre: "Creacion de instituto: " + nuevoInstituto.nombre
        })
    }
}

async function desactivarInstituto(id) {
    let institutosActuales = state.institutos.get();
    let nuevosInstitutos = institutosActuales.map(item => {
        if (item.id === id) {
            registrarOperacion({
                nombre: "Desactivacion de Instituto: " + item.nombre
            })
            return { ...item, isActive: false };
        }
        return item;
    });
    state.institutos.set(nuevosInstitutos);
}

async function obtenerInstitutos() {
    let institutosActivos = state.institutos.get().filter((item) => item.isActive);
    return institutosActivos;
}


export {
    crearInstituto,
    obtenerInstitutos,
    desactivarInstituto,
}
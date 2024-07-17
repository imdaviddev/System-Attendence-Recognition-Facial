import { state } from "@/store/state";
import { registrarOperacion } from "./logService";

async function crearRol(rol) {
    // Se va a fijar si está offline 
    // Si lo está, lo almacena localmente
    // Luego se subirá a la nube

    let rolesActuales = state.roles.get();
    let comprobarRolExiste = rolesActuales.find((item) => item.nombre === rol.nombre);
    
    if (comprobarRolExiste) {
        let nuevosroles = rolesActuales.map(item => {
            if (item.nombre === rol.nombre) {
                registrarOperacion({
                    nombre: "Se reactivo un rol: " + item.nombre
                })
                return { ...item, isActive: true };
            }
            return item;
        });
        state.roles.set(nuevosroles);
    } else {
        const nuevoID = state.id_roles.id.get();
        let nuevoRol = { ...rol, isActive: true };
        nuevoRol.id = nuevoID;
        
        state.roles.set([...rolesActuales, nuevoRol]);
        state.id_roles.id.set(nuevoID + 1);

        registrarOperacion({
            nombre: "Se registro un nuevo rol: " + nuevoRol.nombre
        })
    }
}

async function desactivarRol(id) {
    let rolesActuales = state.roles.get();
    let nuevosroles = rolesActuales.map(item => {
        if (item.id === id) {
            registrarOperacion({
                nombre: "Se desactivo un rol: " + item.nombre
            })
            return { ...item, isActive: false };
        }
        return item;
    });
    state.roles.set(nuevosroles);
}

async function obtenerRoles() {
    let rolesActivos = state.roles.get().filter((item) => item.isActive);
    return rolesActivos;
}


export {
    crearRol,
    obtenerRoles,
    desactivarRol,
}
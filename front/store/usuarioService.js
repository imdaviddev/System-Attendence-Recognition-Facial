import { state } from "@/store/state";
import { registrarOperacion } from "./logService";

async function registrarUsuario(usuario) {
    // Se va a fijar si está offline 
    // Si lo está, lo almacena localmente
    // Luego se subirá a la nube

    let usuariosActuales = state.usuarios.get();
    let comprobarSiUsuarioExiste = usuariosActuales.find((item) => item.dni === usuario.dni);
    
    if (comprobarSiUsuarioExiste) {
        let actualizarusuarios = usuariosActuales.map(item => {
            if (item.dni === usuario.dni) {
                registrarOperacion({
                    nombre: "Se reactivo un usuario: " + item.dni
                })
                return { ...item, isActive: true };
            }
            return item;
        });
        state.usuarios.set(actualizarusuarios);
    } else {
        const nuevoID = state.id_usuario.id.get();
        let nuevousuario = { ...usuario, isActive: true };
        nuevousuario.id = nuevoID;
        
        state.usuarios.set([...usuariosActuales, nuevousuario]);
        state.id_usuario.id.set(nuevoID + 1);

        registrarOperacion({
            nombre: "Se registro un nuevo usuario: " + nuevousuario.dni
        })
    }
}

async function desactivarUsuario(id) {
    let usuariosActuales = state.usuarios.get();
    let actualizarusuarios = usuariosActuales.map(item => {
        if (item.id === id) {
            registrarOperacion({
                nombre: "Se desactivo el usuario: " + item.dni 
            })
            return { ...item, isActive: false };
        }
        return item;
    });
    state.usuarios.set(actualizarusuarios);
}

async function obtenerUsuarios() {
    let usuariosACtivos = state.usuarios.get().filter((item) => item.isActive);
    return usuariosACtivos;
}


export {
    registrarUsuario,
    obtenerUsuarios,
    desactivarUsuario,
}
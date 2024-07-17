import { state } from "@/store/state";
import { registrarOperacion } from "./logService";

async function registrarCategoria(categoria) {
    // Se va a fijar si está offline 
    // Si lo está, lo almacena localmente
    // Luego se subirá a la nube

    let categorisActuales = state.categorias.get();
    let comprobarCategoriaExiste = categorisActuales.find((item) => item.nombre === categoria.nombre);
    
    if (comprobarCategoriaExiste) {
        let nuevasCategorias = categorisActuales.map(item => {
            if (item.nombre === categoria.nombre) {
                registrarOperacion({
                    nombre: "Se reactivo una categoria: " + item.nombre 
                })
                return { ...item, isActive: true };
            }
            return item;
        });
        state.categorias.set(nuevasCategorias);
    } else {
        const nuevoID = state.id_categorias.id.get();
        let nuevaCategoria = { ...categoria, isActive: true };
        nuevaCategoria.id = nuevoID;
        
        state.categorias.set([...categorisActuales, nuevaCategoria]);
        state.id_categorias.id.set(nuevoID + 1);

        registrarOperacion({
            nombre: "Se registro una nueva categoria: " + nuevaCategoria.nombre
        })
    }
}

async function desactivarCategoria(id) {
    let categoriasActuales = state.categorias.get();
    let nuevasCategorias = categoriasActuales.map(item => {
        if (item.id=== id) {
            registrarOperacion({
                nombre: "Se desactivo una categoria: " + item.nombre
            })
            return { ...item, isActive: false };
        }
        return item;
    });
    state.categorias.set(nuevasCategorias);
}

async function obtenerCategorias() {
    let categoriasActivos = state.categorias.get().filter((item) => item.isActive);
    return categoriasActivos;
}


export {
    registrarCategoria,
    obtenerCategorias,
    desactivarCategoria,
}
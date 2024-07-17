import { state } from "@/store/state";
import { registrarOperacion } from "./logService";

async function registrarEmpresa(empresa){
    // Se va a fijar si está offline 
    // Si lo está, lo almacena localmente
    // Luego se subirá a la nube

    let empresasActuales = state.empresas.get();
    let comprobarEmpresaExiste = empresasActuales.find((item) => item.nombre === empresa.nombre);
    
    if (comprobarEmpresaExiste) {
        let nuevasEmpresas = empresasActuales.map(item => {
            if (item.nombre === empresa.nombre) {
                registrarOperacion({
                    nombre: "Se reactivo una empresa: " + item.nombre
                })
                return { ...item, isActive: true };
            }
            return item;
        });
        state.empresas.set(nuevasEmpresas);
    } else {
        const nuevoID = state.id_empresas.id.get();
        let nuevaEmpresa = { ...empresa, isActive: true };
        nuevaEmpresa.id = nuevoID;
        
        state.empresas.set([...empresasActuales, nuevaEmpresa]);
        state.id_empresas.id.set(nuevoID + 1);

        registrarOperacion({
            nommbre: "Se registro una nueva empresa: " + nuevaEmpresa.nombre
        })
    }
}

async function desactivarEmpresa(id){
    let empresasActuales = state.empresas.get();
    let nuevasEmpresas = empresasActuales.map(item => {
        if (item.id === id) {
            registrarOperacion({
                nombre: "Se desactivo una empresa: "+ item.nombre
            })
            return { ...item, isActive: false };
        }
        return item;
    });
    state.empresas.set(nuevasEmpresas);
}

async function obtenerEmpresas(){
    let empresasActivas = state.empresas.get().filter((item) => item.isActive)
    return empresasActivas
}

export {
    registrarEmpresa,
    obtenerEmpresas,
    desactivarEmpresa,
}
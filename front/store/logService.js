import { state } from "@/store/state";


async function registrarOperacion(log) {
    // Se va a fijar si está offline 
    // Si lo está, lo almacena localmente
    // Luego se subirá a la nube

    let logsActuales = state.logs.get();
    let comprobarSiExisteLog = logsActuales.find((item) => item.nombre === log.nombre);
    
    if (comprobarSiExisteLog) {
        let logsNuevos = logsActuales.map(item => {
            if (item.nombre === log.nombre) {
                return { ...item, isActive: true };
            }
            return item;
        });
        state.logs.set(logsNuevos);
    } else {
        const nuevoID = state.id_logs.id.get();
        let nuevoLog = { ...log, isActive: true };
        nuevoLog.id = nuevoID;
        nuevoLog.fecha = (new Date(Date.now())).toLocaleDateString()
        
        state.logs.set([...logsActuales, nuevoLog]);
        state.id_logs.id.set(nuevoID + 1);
    }
}

async function obtenerOperaciones() {
    let logs = state.logs.get().filter((item) => item.isActive);
    return logs;
}


export {
    registrarOperacion,
    obtenerOperaciones,
}
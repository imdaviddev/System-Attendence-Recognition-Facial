const ADMINISTRACION_DE_EXCEPCIONES = "/(admin)/excepciones"
const REGISTRO_DE_EXCEPCIONES = "/(admin)/excepciones/registro"

const ADMINISTRACION_DE_USUARIOS = "/(admin)/usuarios"
const REGISTRO_DE_USUAROS = "/(admin)/usuarios/registro"

const ADMINISTRACION_DE_VISITANTES = "/(admin)/visitantes"
const REGISTRO_DE_VISITANTES = "/(admin)/visitantes/registro"
const MODIFICACION_DE_VISITANTES = "/(admin)/visitantes/modificar"

const ADMINISTRACION_DE_INSTITUTOS = "/(admin)/institutos"
const REGISTRO_DE_INSTITUTOS = "/(admin)/institutos/registro"

const ADMINISTRACION_DE_CATEGORIAS = "/(admin)/categorias"
const REGISTRO_DE_CATEGORIAS = "/(admin)/categorias"
const MODIFICACION_DE_CATEGORIAS = "/(admin)/categorias"


const ADMINISTRACION_DE_ROLES = "/(admin)/roles"
const REGISTRO_DE_ROLES = "/(admin)/roles/registro"
const MODIFICACION_DE_ROLES = "/(admin)/roles"

const ADMINISTRACION_DE_EMPRESAS = "/(admin)/empresas"

const ADMINISTRACION_DE_LUGARES = "/(admin)/lugares"
const REGISTRO_DE_LUGARES = "/(admin)/lugares/registro"

const HISTORIAL_DE_LOGS = "/(admin)/logs"


// seguridad
export const AUTENTICAR_VISITANTES = "/(seguridad)/autenticar"

export {
    ADMINISTRACION_DE_CATEGORIAS,
    ADMINISTRACION_DE_EXCEPCIONES,
    ADMINISTRACION_DE_INSTITUTOS,
    ADMINISTRACION_DE_VISITANTES,
    ADMINISTRACION_DE_USUARIOS,
    ADMINISTRACION_DE_EMPRESAS,
    ADMINISTRACION_DE_ROLES,
    ADMINISTRACION_DE_LUGARES,
    HISTORIAL_DE_LOGS,

    REGISTRO_DE_VISITANTES,
    MODIFICACION_DE_VISITANTES,

    REGISTRO_DE_INSTITUTOS,

    REGISTRO_DE_ROLES,
    MODIFICACION_DE_ROLES,

    REGISTRO_DE_LUGARES,

    REGISTRO_DE_EXCEPCIONES,

    REGISTRO_DE_USUAROS,
}
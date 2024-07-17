export default function institutosToString(institutos) {
    let nombresInstitutos = [];

    institutos?.map((institucion) => {
        nombresInstitutos.push(institucion.nombre);
    });

    let stringNombresInstitutos = nombresInstitutos.join(" ");
    return stringNombresInstitutos;
}
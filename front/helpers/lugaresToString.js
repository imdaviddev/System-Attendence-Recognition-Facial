export default function lugaresToString(lugares){
    let nombresLugares = [];

    lugares?.forEach((lugar) => {
        nombresLugares.push(lugar.nombre);
    });

    let stringNombreslugares = nombresLugares.join(" ");
    return stringNombreslugares;   
}
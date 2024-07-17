export default function arrayToString(array){
    let nombres = array.map(item => item.nombre)
    return nombres.join(" ")
}

export function arrayToStringPerValue(array, field){
    let fields = array.map(item => item[field])
    return fields.joint(" ")
}
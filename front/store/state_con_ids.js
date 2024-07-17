import { observable } from "@legendapp/state";

export const estados = observable({
  institutos: [
    {
      id: 1, nombre: "IDEI", descripcion: "Instituto de Industria",
      lugares: [
        { id: 7 },
        { id: 3 }
      ],
      isActive: true
    },
    {
      id: 2, nombre: "ICI", descripcion: "Instituto de Ciencia",
      lugares: [
        { id: 5 },
        { id: 7 },
        { id: 3 },
      ],
      isActive: true
    },
    {
      id: 3, nombre: "IDH", descripcion: "Instituto de Desarrollo Humano",
      lugares: [
        { id: 7 },
        { id: 3 },
      ],
      isActive: true
    }
  ],
  id_institutos: { id: 4 },

  empresas: [
    { id: 1, nombre: "Coca-Cola", descripcion: "Genera diabetes", direccion: "Argentina Buenos Aires Jose C Paz Altube 4320", isActive: true },
    { id: 2, nombre: "Pepsi", descripcion: "Distribuidor del local", direccion: "Argentina Buenos Aires San Miguel", isActive: true },
    { id: 3, nombre: "Don Satur", descripcion: "Distribuidor del local", direccion: "Argentina La Pampa", isActive: true },
  ],
  id_empresas: { id: 4 },

  lugares: [
    { id: 1, nombre: "Modulo 1", descripcion: "Administrativo", isActive: true },
    { id: 2, nombre: "Modulo 2", descripcion: "Papeleo", isActive: true },
    { id: 3, nombre: "Modulo 3", descripcion: "Clases en general", isActive: true },
    { id: 4, nombre: "Modulo 4", descripcion: "Clases en general", isActive: true },
    { id: 5, nombre: "Modulo 5", descripcion: "Clases en general", isActive: true },
    { id: 6, nombre: "Modulo 6", descripcion: "Clases en general", isActive: true },
    { id: 7, nombre: "Modulo 7", descripcion: "Clases en general", isActive: true },
    { id: 8, nombre: "Laboratorio", descripcion: "Clases en general", isActive: true },
    { id: 9, nombre: "Biblioteca", descripcion: "Espacio de lectura", isActive: true },
    { id: 10, nombre: "Buffet", descripcion: "Espacio de Almuerzo", isActive: true },
  ],
  id_lugares: { id: 11 },

  roles: [
    { id: 1, nombre: "Docente", descripcion: "Se encarga de enseñar", isActive: true, lugares: [] },
    { id: 2, nombre: "Rector", descripcion: "Se encarga de dirigir la Universidad", isActive: true, lugares: [] },
    { id: 3, nombre: "Estudiante", descripcion: "Se encarga de estudiar", isActive: true, lugares: [] },
    { id: 4, nombre: "Auxiliar de Limpieza", descripcion: "Se encarga de limpiar la Universidad", isActive: true, lugares: [] },
  ],
  id_roles: { id: 5 },

  categorias: [
    { id: 1, nombre: "interno", descripcion: "Todos aquellos que pertenezcan en una elacion directa a la UNGS", isActive: true },
    { id: 2, nombre: "externo", descripcion: "Todos aquellos que no pertenezcan en una elacion directa a la UNGS", isActive: true },
  ],
  id_categorias: { id: 3 },

  visitantes: [
    {
      id: 1,
      imagen: null,
      nombre: "David",
      apellido: "Cañete",
      dni: "42300570",
      email: "carlitosvala@gmail.com",
      categoria: { id: 1 },
      rol: { id: 1 },
      isActive: true,
      lugares: [
        { id: 6 }, 
        { id: 7 }, 
        { id: 8 }, 
        { id: 9 }, 
        { id: 10 },
      ],
      institutos: [
        { id: 1 },
        { id: 2 },
      ],
      empresa: [],
    }
  ],
  id_visitante: { id: 2 }
});

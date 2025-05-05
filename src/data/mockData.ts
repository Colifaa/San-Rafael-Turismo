
import { Alojamiento, Actividad, Testimonio } from "@/types";

// Datos de alojamientos
export const alojamientosMock: Alojamiento[] = [
  {
    id: "aloj-1",
    titulo: "Cabaña El Descanso",
    descripcion: "Hermosa cabaña de madera con vista a las montañas, piscina privada y asador. Ideal para parejas y familias pequeñas que buscan tranquilidad y contacto con la naturaleza.",
    precio: 18000,
    precioUnidad: "por noche",
    imagen: "/alojamientos/cabana1.jpg",
    imagenes: [
      "/alojamientos/cabana1.jpg",
      "/alojamientos/cabana1-interior.jpg",
      "/alojamientos/cabana1-exterior.jpg"
    ],
    ubicacion: "Valle Grande, San Rafael",
    coordenadas: {
      lat: -34.7985,
      lng: -68.4857
    },
    rating: 4.8,
    categoria: "Cabaña",
    comodidades: [
      "Wifi", "Piscina", "Estacionamiento", "TV", "Cocina", "Asador", "Calefacción"
    ],
    capacidad: 4,
    habitaciones: 2,
    banos: 1,
    mascotas: true,
    destacado: true
  },
  {
    id: "aloj-2",
    titulo: "Complejo Terrazas del Atardecer",
    descripcion: "Modernas cabañas con vista panorámica al atardecer de San Rafael. Equipadas con jacuzzi, deck privado y todas las comodidades para una estadía inolvidable.",
    precio: 22000,
    precioUnidad: "por noche",
    imagen: "/alojamientos/cabana2.jpg",
    imagenes: [
      "/alojamientos/cabana2.jpg",
      "/alojamientos/cabana2-interior.jpg",
      "/alojamientos/cabana2-vista.jpg"
    ],
    ubicacion: "Cañon del Atuel, San Rafael",
    coordenadas: {
      lat: -34.8354,
      lng: -68.5214
    },
    rating: 4.7,
    categoria: "Cabaña",
    comodidades: [
      "Wifi", "Jacuzzi", "Estacionamiento", "TV", "Cocina", "Parrilla", "Calefacción", "Aire acondicionado"
    ],
    capacidad: 6,
    habitaciones: 3,
    banos: 2,
    mascotas: false,
    destacado: true
  },
  {
    id: "aloj-3",
    titulo: "Hotel Urbano Céntrico",
    descripcion: "Hotel moderno ubicado en el centro de San Rafael, cerca de restaurantes, bares y puntos turísticos. Habitaciones confortables con desayuno incluido.",
    precio: 15000,
    precioUnidad: "por noche",
    imagen: "/alojamientos/hotel1.jpg",
    imagenes: [
      "/alojamientos/hotel1.jpg",
      "/alojamientos/hotel1-habitacion.jpg",
      "/alojamientos/hotel1-desayuno.jpg"
    ],
    ubicacion: "Centro, San Rafael",
    coordenadas: {
      lat: -34.6177,
      lng: -68.3301
    },
    rating: 4.5,
    categoria: "Hotel",
    comodidades: [
      "Wifi", "Desayuno incluido", "Estacionamiento", "TV", "Aire acondicionado", "Restaurant", "Bar"
    ],
    capacidad: 2,
    habitaciones: 1,
    banos: 1,
    mascotas: false
  },
  {
    id: "aloj-4",
    titulo: "Posada del Viñedo",
    descripcion: "Encantadora posada ubicada en el corazón de los viñedos mendocinos. Habitaciones con vista a los viñedos y experiencias de enoturismo incluidas.",
    precio: 25000,
    precioUnidad: "por noche",
    imagen: "/alojamientos/posada1.jpg",
    imagenes: [
      "/alojamientos/posada1.jpg",
      "/alojamientos/posada1-interior.jpg",
      "/alojamientos/posada1-vinedo.jpg"
    ],
    ubicacion: "Cuadro Benegas, San Rafael",
    coordenadas: {
      lat: -34.6532,
      lng: -68.4029
    },
    rating: 4.9,
    categoria: "Posada",
    comodidades: [
      "Wifi", "Desayuno regional", "Estacionamiento", "TV", "Calefacción", "Tour por viñedo", "Cata de vinos"
    ],
    capacidad: 2,
    habitaciones: 1,
    banos: 1,
    mascotas: false,
    destacado: true
  },
];

// Datos de actividades
export const actividadesMock: Actividad[] = [
  {
    id: "act-1",
    titulo: "Rafting en el Río Atuel",
    descripcion: "Experiencia de rafting por los rápidos del Cañón del Atuel con guías profesionales. Incluye equipo completo de seguridad y transporte desde el centro de San Rafael.",
    precio: 12000,
    precioUnidad: "por persona",
    imagen: "/actividades/rafting.jpg",
    imagenes: [
      "/actividades/rafting.jpg",
      "/actividades/rafting2.jpg",
      "/actividades/rafting3.jpg"
    ],
    ubicacion: "Cañón del Atuel, San Rafael",
    coordenadas: {
      lat: -34.8500,
      lng: -68.5300
    },
    rating: 4.9,
    categoria: "Aventura",
    duracion: "3 horas",
    incluye: [
      "Equipo completo", "Guía profesional", "Transporte", "Snack", "Seguro"
    ],
    noIncluye: [
      "Almuerzo", "Bebidas", "Fotos profesionales"
    ],
    capacidad: 8,
    dificultad: "media",
    edadMinima: 12,
    destacado: true
  },
  {
    id: "act-2",
    titulo: "Tour de Bodegas Premium",
    descripcion: "Visita a tres bodegas premium de San Rafael con degustación de vinos, visita a viñedos y almuerzo gourmet incluido. Transporte privado y guía especializado.",
    precio: 18000,
    precioUnidad: "por persona",
    imagen: "/actividades/bodega.jpg",
    imagenes: [
      "/actividades/bodega.jpg",
      "/actividades/bodega2.jpg",
      "/actividades/bodega3.jpg"
    ],
    ubicacion: "Valle de Cuadro Benegas, San Rafael",
    coordenadas: {
      lat: -34.6532,
      lng: -68.4029
    },
    rating: 4.8,
    categoria: "Gastronomía",
    duracion: "6 horas",
    incluye: [
      "Visita a 3 bodegas", "Degustación de vinos", "Almuerzo gourmet", "Transporte", "Guía bilingüe"
    ],
    noIncluye: [
      "Compra de botellas", "Propinas"
    ],
    capacidad: 12,
    dificultad: "baja",
    edadMinima: 18,
    destacado: true
  },
  {
    id: "act-3",
    titulo: "Cabalgata al Atardecer",
    descripcion: "Recorre los paisajes más hermosos de San Rafael a caballo, mientras disfrutas de un atardecer inolvidable. Incluye clase básica de equitación y mate con tortas fritas.",
    precio: 8000,
    precioUnidad: "por persona",
    imagen: "/actividades/cabalgata.jpg",
    imagenes: [
      "/actividades/cabalgata.jpg",
      "/actividades/cabalgata2.jpg",
      "/actividades/cabalgata3.jpg"
    ],
    ubicacion: "Los Reyunos, San Rafael",
    coordenadas: {
      lat: -34.6047,
      lng: -68.6576
    },
    rating: 4.7,
    categoria: "Naturaleza",
    duracion: "2 horas",
    incluye: [
      "Caballo equipado", "Guía local", "Clase básica", "Merienda regional"
    ],
    noIncluye: [
      "Transporte hasta el punto de encuentro", "Fotos profesionales"
    ],
    capacidad: 10,
    dificultad: "baja",
    edadMinima: 8,
    destacado: false
  },
  {
    id: "act-4",
    titulo: "Tirolesa y Puentes Colgantes",
    descripcion: "Circuito de aventura con 5 tirolesas y puentes colgantes entre los árboles. Vista panorámica del Valle Grande y adrenalina garantizada con todas las medidas de seguridad.",
    precio: 14000,
    precioUnidad: "por persona",
    imagen: "/actividades/tirolesa.jpg",
    imagenes: [
      "/actividades/tirolesa.jpg",
      "/actividades/tirolesa2.jpg",
      "/actividades/tirolesa3.jpg"
    ],
    ubicacion: "Valle Grande, San Rafael",
    coordenadas: {
      lat: -34.7985,
      lng: -68.4857
    },
    rating: 4.6,
    categoria: "Aventura",
    duracion: "2 horas",
    incluye: [
      "Equipamiento completo", "Instructores certificados", "Seguro", "Fotos digitales"
    ],
    noIncluye: [
      "Transporte", "Bebidas", "Comidas"
    ],
    capacidad: 15,
    dificultad: "media",
    edadMinima: 10,
    destacado: true
  },
];

// Datos de testimonios
export const testimoniosMock: Testimonio[] = [
  {
    id: "test-1",
    nombre: "Laura Rodríguez",
    ubicacion: "Buenos Aires, Argentina",
    texto: "¡Experiencia increíble! Las cabañas eran hermosas y muy limpias. El rafting fue la mejor parte del viaje, los guías muy profesionales y divertidos.",
    rating: 5,
    imagen: "/testimonios/persona1.jpg",
    fecha: "15/02/2023"
  },
  {
    id: "test-2",
    nombre: "Carlos Méndez",
    ubicacion: "Córdoba, Argentina",
    texto: "Viajamos en familia y todos quedamos encantados. El tour de bodegas estuvo excelente, muy buen servicio y atención personalizada.",
    rating: 5,
    imagen: "/testimonios/persona2.jpg",
    fecha: "03/03/2023"
  },
  {
    id: "test-3",
    nombre: "Marcela Gómez",
    ubicacion: "Rosario, Argentina",
    texto: "La cabalgata al atardecer fue mágica, un recuerdo que quedará para siempre. Además el alojamiento era perfecto, con todas las comodidades.",
    rating: 4,
    imagen: "/testimonios/persona3.jpg",
    fecha: "22/01/2023"
  },
  {
    id: "test-4",
    nombre: "Diego Torres",
    ubicacion: "Mendoza, Argentina",
    texto: "El parque de tirolesas tiene una vista espectacular. La adrenalina de cruzar sobre el valle es indescriptible. El hotel céntrico nos permitió movernos fácilmente.",
    rating: 5,
    imagen: "/testimonios/persona4.jpg",
    fecha: "10/04/2023"
  },
];

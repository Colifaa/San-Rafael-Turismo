
// Tipos para los alojamientos
export interface Alojamiento {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  precioUnidad: string;
  imagen: string;
  imagenes: string[];
  ubicacion: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
  rating: number;
  categoria: string;
  comodidades: string[];
  capacidad: number;
  habitaciones: number;
  banos: number;
  mascotas: boolean;
  destacado?: boolean;
}

// Tipos para las actividades
export interface Actividad {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  precioUnidad: string;
  imagen: string;
  imagenes: string[];
  ubicacion: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
  rating: number;
  categoria: string;
  duracion: string;
  incluye: string[];
  noIncluye: string[];
  capacidad: number;
  dificultad: "baja" | "media" | "alta";
  edadMinima: number;
  destacado?: boolean;
}

// Tipos para los testimonios
export interface Testimonio {
  id: string;
  nombre: string;
  ubicacion: string;
  texto: string;
  rating: number;
  imagen?: string;
  fecha: string;
}

// Tipos para reservas
export interface Reserva {
  id: string;
  usuarioId: string;
  itemId: string;
  itemTipo: 'alojamiento' | 'actividad';
  fechaInicio: string;
  fechaFin?: string;
  cantidadPersonas: number;
  precio: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  fechaCreacion: string;
  comentario?: string;
}

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Alojamiento, Actividad, Reserva } from '@/types';

interface AppContextType {
  alojamientos: Alojamiento[];
  actividades: Actividad[];
  reservas: Reserva[];
  agregarReserva: (reserva: Omit<Reserva, 'id' | 'fechaCreacion'>) => void;
  buscarAlojamientos: (texto: string) => Alojamiento[];
  buscarActividades: (texto: string, categoria?: string) => Actividad[];
  obtenerAlojamiento: (id: string) => Alojamiento | undefined;
  obtenerActividad: (id: string) => Actividad | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [actividades] = useState<Actividad[]>([]); // Puedes migrar actividades igual si lo deseas
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    async function fetchAlojamientos() {
      const { data, error } = await supabase.from('accommodations').select('*');
      if (error) {
        console.error('Error al traer alojamientos:', error);
      } else if (data) {
        setAlojamientos(
          data.map((item: any) => ({
            id: item.id,
            titulo: item.name,
            descripcion: item.description,
            precio: item.price_per_night,
            precioUnidad: item.precio_unidad || 'por noche',
            imagen: item.imagen || (item.images?.[0] ?? ''),
            imagenes: item.images || [],
            ubicacion: item.address,
            coordenadas: item.coordenadas,
            rating: item.rating ?? 0,
            categoria: item.categoria || '',
            comodidades: item.amenities || [],
            capacidad: item.capacity,
            habitaciones: item.habitaciones ?? 1,
            banos: item.banos ?? 1,
            mascotas: item.mascotas ?? false,
            destacado: item.destacado ?? false,
          }))
        );
      }
    }
    fetchAlojamientos();
  }, []);

  const agregarReserva = (nuevaReserva: Omit<Reserva, 'id' | 'fechaCreacion'>) => {
    const reservaCompleta: Reserva = {
      ...nuevaReserva,
      id: `res-${Date.now()}`,
      fechaCreacion: new Date().toISOString()
    };
    setReservas(prevReservas => [...prevReservas, reservaCompleta]);
  };

  const buscarAlojamientos = (texto: string): Alojamiento[] => {
    if (!texto.trim()) return alojamientos;
    const textoLower = texto.toLowerCase();
    return alojamientos.filter(
      aloj => 
        aloj.titulo.toLowerCase().includes(textoLower) ||
        aloj.descripcion.toLowerCase().includes(textoLower) ||
        aloj.ubicacion.toLowerCase().includes(textoLower)
    );
  };

  const buscarActividades = (texto: string, categoria?: string): Actividad[] => {
    let resultado = actividades;
    if (categoria) {
      resultado = resultado.filter(act => act.categoria.toLowerCase() === categoria.toLowerCase());
    }
    if (!texto.trim()) return resultado;
    const textoLower = texto.toLowerCase();
    return resultado.filter(
      act => 
        act.titulo.toLowerCase().includes(textoLower) ||
        act.descripcion.toLowerCase().includes(textoLower) ||
        act.ubicacion.toLowerCase().includes(textoLower)
    );
  };

  const obtenerAlojamiento = (id: string): Alojamiento | undefined => {
    return alojamientos.find(aloj => aloj.id === id);
  };

  const obtenerActividad = (id: string): Actividad | undefined => {
    return actividades.find(act => act.id === id);
  };

  return (
    <AppContext.Provider value={{
      alojamientos,
      actividades,
      reservas,
      agregarReserva,
      buscarAlojamientos,
      buscarActividades,
      obtenerAlojamiento,
      obtenerActividad
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};

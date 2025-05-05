
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, MapPin, Star, Wifi, Car, Tv, Coffee, Flame, Thermometer, Wind, Check, Users, Bed, Bath } from "lucide-react";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/components/ui/testimonial";
import { testimoniosMock } from "@/data/mockData";

const DetalleAlojamiento = () => {
  const { id } = useParams();
  const { obtenerAlojamiento } = useApp();
  const alojamiento = obtenerAlojamiento(id || "");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);
  const [imgActiva, setImgActiva] = useState(0);
  
  if (!alojamiento) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Alojamiento no encontrado</h2>
            <p className="mb-4">El alojamiento que buscas no existe o no está disponible.</p>
            <Link to="/alojamientos">
              <Button>Ver todos los alojamientos</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const testimoniosRelacionados = testimoniosMock.slice(0, 2);
  
  const iconProps = { size: 20, className: "mr-2 text-gray-500" };
  
  const renderComodidad = (nombre: string) => {
    const icono = (() => {
      switch (nombre.toLowerCase()) {
        case "wifi": return <Wifi {...iconProps} />;
        case "estacionamiento": return <Car {...iconProps} />;
        case "tv": return <Tv {...iconProps} />;
        case "desayuno incluido": return <Coffee {...iconProps} />;
        case "desayuno regional": return <Coffee {...iconProps} />;
        case "asador": return <Flame {...iconProps} />;
        case "parrilla": return <Flame {...iconProps} />;
        case "calefacción": return <Thermometer {...iconProps} />;
        case "aire acondicionado": return <Wind {...iconProps} />;
        default: return <Check {...iconProps} />;
      }
    })();
    
    return (
      <li key={nombre} className="flex items-center mb-3">
        {icono}
        {nombre}
      </li>
    );
  };
  
  const renderImagenes = () => {
    // Si no hay imágenes en el array, usamos la imagen principal
    const imagenes = alojamiento.imagenes.length > 0 
      ? alojamiento.imagenes 
      : [alojamiento.imagen];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <img 
            src={imagenes[imgActiva]} 
            alt={alojamiento.titulo} 
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
          {imagenes.map((img, i) => (
            <div 
              key={i} 
              className={`cursor-pointer border-2 rounded ${imgActiva === i ? 'border-brand-green' : 'border-transparent'}`}
              onClick={() => setImgActiva(i)}
            >
              <img 
                src={img} 
                alt={`Vista ${i+1}`} 
                className="w-full h-24 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contenido principal */}
          <div className="w-full lg:w-2/3">
            {/* Cabecera */}
            <div className="mb-6">
              <Link to="/alojamientos" className="text-brand-green mb-2 inline-block">
                &larr; Volver a alojamientos
              </Link>
              <h1 className="text-3xl font-bold mb-3">{alojamiento.titulo}</h1>
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-4">
                  <Star size={20} className="text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-semibold">{alojamiento.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 mr-1" />
                  <span className="text-gray-700">{alojamiento.ubicacion}</span>
                </div>
              </div>
              <Badge>{alojamiento.categoria}</Badge>
            </div>
            
            {/* Galería de imágenes */}
            <div className="mb-8">
              {renderImagenes()}
            </div>
            
            {/* Pestañas de información */}
            <Tabs defaultValue="descripcion" className="mb-8">
              <TabsList>
                <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                <TabsTrigger value="detalles">Detalles</TabsTrigger>
                <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
                <TabsTrigger value="opiniones">Opiniones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="descripcion" className="pt-6">
                <p className="text-gray-700 mb-4">{alojamiento.descripcion}</p>
                
                <h3 className="text-xl font-semibold mb-4">Comodidades destacadas</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
                  {alojamiento.comodidades.map(renderComodidad)}
                </ul>
              </TabsContent>
              
              <TabsContent value="detalles" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Detalles del alojamiento</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-3">Capacidad y distribución</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Users className="mr-2 text-gray-500" size={18} />
                        <span>Capacidad para {alojamiento.capacidad} personas</span>
                      </li>
                      <li className="flex items-center">
                        <Bed className="mr-2 text-gray-500" size={18} />
                        <span>{alojamiento.habitaciones} habitaciones</span>
                      </li>
                      <li className="flex items-center">
                        <Bath className="mr-2 text-gray-500" size={18} />
                        <span>{alojamiento.banos} baños</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-3">Características</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 text-gray-500" size={18} />
                        <span>{alojamiento.mascotas ? "Se admiten mascotas" : "No se admiten mascotas"}</span>
                      </li>
                      {/* Más características si estuvieran disponibles */}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ubicacion" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
                <p className="mb-4">{alojamiento.ubicacion}</p>
                
                {/* Aquí podría ir un mapa con la ubicación exacta */}
                <div className="bg-gray-200 h-80 w-full rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Mapa no disponible en la versión demo</p>
                </div>
              </TabsContent>
              
              <TabsContent value="opiniones" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Opiniones de huéspedes</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {testimoniosRelacionados.map((testimonio) => (
                    <Testimonial 
                      key={testimonio.id}
                      name={testimonio.nombre}
                      location={testimonio.ubicacion}
                      text={testimonio.texto}
                      rating={testimonio.rating}
                      image={testimonio.imagen}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar de reserva */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white shadow-lg rounded-lg p-6 sticky top-24">
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-gray-900">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(alojamiento.precio)}</span>
                <span className="text-gray-500 text-base font-normal"> {alojamiento.precioUnidad}</span>
              </h3>
              
              <div className="border-t border-b py-4 my-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de llegada
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP", { locale: es })
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        locale={es}
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Huéspedes
                  </label>
                  <div className="flex border rounded-md">
                    <button
                      type="button"
                      className="px-3 py-2 border-r"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      -
                    </button>
                    <div className="flex-1 flex items-center justify-center">
                      <Users size={16} className="mr-2 text-gray-500" />
                      <span>{guests} {guests === 1 ? "persona" : "personas"}</span>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-2 border-l"
                      onClick={() => setGuests(Math.min(alojamiento.capacidad, guests + 1))}
                      disabled={guests >= alojamiento.capacidad}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Máximo {alojamiento.capacidad} personas
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(alojamiento.precio)} x 1 noche</span>
                  <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(alojamiento.precio)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tarifa de servicio</span>
                  <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(alojamiento.precio * 0.1)}</span>
                </div>
                <div className="flex justify-between font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(alojamiento.precio * 1.1)}</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Reservar ahora
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                No se te cobrará nada todavía
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DetalleAlojamiento;

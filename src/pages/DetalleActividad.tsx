
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, MapPin, Star, Check, X, Users, Clock, ActivityIcon, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/components/ui/testimonial";
import { testimoniosMock } from "@/data/mockData";

const DetalleActividad = () => {
  const { id } = useParams();
  const { obtenerActividad } = useApp();
  const actividad = obtenerActividad(id || "");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);
  const [imgActiva, setImgActiva] = useState(0);
  
  if (!actividad) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Actividad no encontrada</h2>
            <p className="mb-4">La actividad que buscas no existe o no está disponible.</p>
            <Link to="/actividades">
              <Button>Ver todas las actividades</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const testimoniosRelacionados = testimoniosMock.slice(0, 2);
  
  const getDificultadColor = (dificultad: string) => {
    switch (dificultad) {
      case 'baja': return 'bg-green-100 text-green-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'alta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const renderImagenes = () => {
    // Si no hay imágenes en el array, usamos la imagen principal
    const imagenes = actividad.imagenes.length > 0 
      ? actividad.imagenes 
      : [actividad.imagen];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <img 
            src={imagenes[imgActiva]} 
            alt={actividad.titulo} 
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
          {imagenes.map((img, i) => (
            <div 
              key={i} 
              className={`cursor-pointer border-2 rounded ${imgActiva === i ? 'border-brand-blue' : 'border-transparent'}`}
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
              <Link to="/actividades" className="text-brand-blue mb-2 inline-block">
                &larr; Volver a actividades
              </Link>
              <h1 className="text-3xl font-bold mb-3">{actividad.titulo}</h1>
              <div className="flex items-center flex-wrap gap-2 mb-3">
                <div className="flex items-center mr-4">
                  <Star size={20} className="text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-semibold">{actividad.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center mr-4">
                  <MapPin size={18} className="text-gray-500 mr-1" />
                  <span className="text-gray-700">{actividad.ubicacion}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-500 mr-1" />
                  <span className="text-gray-700">Duración: {actividad.duracion}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>{actividad.categoria}</Badge>
                <Badge variant="outline" className={getDificultadColor(actividad.dificultad)}>
                  Dificultad: {actividad.dificultad.charAt(0).toUpperCase() + actividad.dificultad.slice(1)}
                </Badge>
              </div>
            </div>
            
            {/* Galería de imágenes */}
            <div className="mb-8">
              {renderImagenes()}
            </div>
            
            {/* Pestañas de información */}
            <Tabs defaultValue="descripcion" className="mb-8">
              <TabsList>
                <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                <TabsTrigger value="incluye">Qué incluye</TabsTrigger>
                <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
                <TabsTrigger value="opiniones">Opiniones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="descripcion" className="pt-6">
                <p className="text-gray-700 mb-6">{actividad.descripcion}</p>
                
                {/* Información adicional */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-3">Detalles de la actividad</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Users className="mr-2 text-gray-500" size={18} />
                        <span>Capacidad: {actividad.capacidad} personas</span>
                      </li>
                      <li className="flex items-center">
                        <ActivityIcon className="mr-2 text-gray-500" size={18} />
                        <span>Dificultad: {actividad.dificultad.charAt(0).toUpperCase() + actividad.dificultad.slice(1)}</span>
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="mr-2 text-gray-500" size={18} />
                        <span>Edad mínima: {actividad.edadMinima} años</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-3">Recomendaciones</h4>
                    <ul className="space-y-2">
                      <li className="text-sm">Llegar 15 minutos antes de la hora programada</li>
                      <li className="text-sm">Usar ropa y calzado cómodo</li>
                      <li className="text-sm">Traer protector solar y repelente</li>
                      <li className="text-sm">Traer hidratación</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="incluye" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Incluye</h3>
                    <ul className="space-y-2">
                      {actividad.incluye.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="mr-2 text-green-600 mt-0.5 flex-shrink-0" size={18} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">No incluye</h3>
                    <ul className="space-y-2">
                      {actividad.noIncluye.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <X className="mr-2 text-red-600 mt-0.5 flex-shrink-0" size={18} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Alert className="mt-6 bg-blue-50 border-blue-200">
                  <AlertDescription>
                    <strong>Importante:</strong> La actividad está sujeta a condiciones climáticas. 
                    En caso de cancelación por mal clima, podrás reprogramar o solicitar el reembolso completo.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="ubicacion" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
                <p className="mb-4">{actividad.ubicacion}</p>
                
                {/* Aquí podría ir un mapa con la ubicación exacta */}
                <div className="bg-gray-200 h-80 w-full rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Mapa no disponible en la versión demo</p>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">Punto de encuentro</h4>
                  <p className="text-gray-700">
                    El punto de encuentro es en {actividad.ubicacion}. Deberás llegar 15 minutos 
                    antes del horario programado. Recibirás indicaciones detalladas luego de realizar tu reserva.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="opiniones" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Opiniones de viajeros</h3>
                
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
                <span className="text-gray-900">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(actividad.precio)}</span>
                <span className="text-gray-500 text-base font-normal"> {actividad.precioUnidad}</span>
              </h3>
              
              <div className="border-t border-b py-4 my-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha
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
                    Participantes
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
                      onClick={() => setGuests(Math.min(actividad.capacidad, guests + 1))}
                      disabled={guests >= actividad.capacidad}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Máximo {actividad.capacidad} personas
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(actividad.precio)} x {guests} {guests === 1 ? "persona" : "personas"}</span>
                  <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(actividad.precio * guests)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tarifa de servicio</span>
                  <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(actividad.precio * guests * 0.1)}</span>
                </div>
                <div className="flex justify-between font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(actividad.precio * guests * 1.1)}</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Reservar ahora
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Cancelación gratuita con 24 horas de antelación
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DetalleActividad;

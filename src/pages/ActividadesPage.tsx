
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/ui/hero-section";
import { useApp } from "@/context/AppContext";
import FeatureCard from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";

const ActividadesPage = () => {
  const { actividades } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategoria = searchParams.get("categoria");
  
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedDificultad, setSelectedDificultad] = useState<string | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(initialCategoria);
  const [selectedDuracion, setSelectedDuracion] = useState<string | null>(null);
  
  // Extraer categorías únicas
  const categorias = [...new Set(actividades.map(a => a.categoria))];
  
  useEffect(() => {
    if (initialCategoria) {
      setSelectedCategoria(initialCategoria);
    }
  }, [initialCategoria]);
  
  // Función para filtrar actividades
  const filteredActividades = actividades.filter(actividad => {
    // Filtrar por texto
    const matchesText = 
      actividad.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
      actividad.descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
      actividad.ubicacion.toLowerCase().includes(searchText.toLowerCase());
    
    // Filtrar por precio
    const matchesPrice = 
      actividad.precio >= priceRange[0] && 
      actividad.precio <= priceRange[1];
    
    // Filtrar por dificultad
    const matchesDificultad = 
      !selectedDificultad || 
      actividad.dificultad === selectedDificultad;
    
    // Filtrar por categoría
    const matchesCategoria = 
      !selectedCategoria || 
      actividad.categoria.toLowerCase() === selectedCategoria.toLowerCase();
    
    // Filtrar por duración
    const matchesDuracion = 
      !selectedDuracion || 
      (selectedDuracion === "corta" && extractHours(actividad.duracion) <= 2) ||
      (selectedDuracion === "media" && extractHours(actividad.duracion) > 2 && extractHours(actividad.duracion) <= 4) ||
      (selectedDuracion === "larga" && extractHours(actividad.duracion) > 4);
    
    return matchesText && matchesPrice && matchesDificultad && matchesCategoria && matchesDuracion;
  });
  
  // Función auxiliar para extraer las horas de una cadena como "3 horas"
  function extractHours(duration: string): number {
    const match = duration.match(/^(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <HeroSection 
        title="Actividades en San Rafael"
        subtitle="Aventuras, experiencias y tours para disfrutar al máximo"
        showSearch={false}
        backgroundImage="/actividades/rafting.jpg"
      />
      
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Buscador y filtros */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Buscar actividad
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="search"
                    placeholder="Buscar por nombre, descripción o ubicación"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
                Filtros
              </Button>
              
              <Button>
                Buscar
              </Button>
            </div>
            
            {/* Filtros desplegables */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rango de precio
                  </label>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 20000]}
                      max={20000}
                      step={500}
                      minStepsBetweenThumbs={1}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>AR$ {priceRange[0].toLocaleString()}</span>
                      <span>AR$ {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <Select 
                    value={selectedCategoria || ""} 
                    onValueChange={setSelectedCategoria}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas</SelectItem>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria.toLowerCase()}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dificultad
                  </label>
                  <Select onValueChange={setSelectedDificultad}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar dificultad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Cualquiera</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración
                  </label>
                  <Select onValueChange={setSelectedDuracion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Cualquiera</SelectItem>
                      <SelectItem value="corta">Corta (hasta 2h)</SelectItem>
                      <SelectItem value="media">Media (2-4h)</SelectItem>
                      <SelectItem value="larga">Larga (más de 4h)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          
          {/* Resultados */}
          <h2 className="text-2xl font-bold mb-6">
            {filteredActividades.length} actividades encontradas
          </h2>
          
          {filteredActividades.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActividades.map((actividad) => (
                <FeatureCard
                  key={actividad.id}
                  id={actividad.id}
                  type="actividad"
                  title={actividad.titulo}
                  description={actividad.descripcion}
                  price={actividad.precio}
                  priceUnit={actividad.precioUnidad}
                  rating={actividad.rating}
                  image={actividad.imagen}
                  location={actividad.ubicacion}
                  tags={[actividad.categoria]}
                  capacity={actividad.capacidad}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No se encontraron resultados</h3>
              <p className="text-gray-500">Intenta modificar los filtros de búsqueda</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ActividadesPage;

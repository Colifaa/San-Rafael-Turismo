
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal } from "lucide-react";

const AlojamientosPage = () => {
  const { alojamientos } = useApp();
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);
  
  // Extraer categorías únicas
  const categorias = [...new Set(alojamientos.map(a => a.categoria))];
  
  // Función para filtrar alojamientos
  const filteredAlojamientos = alojamientos.filter(alojamiento => {
    // Filtrar por texto
    const matchesText = 
      alojamiento.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
      alojamiento.descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
      alojamiento.ubicacion.toLowerCase().includes(searchText.toLowerCase());
    
    // Filtrar por precio
    const matchesPrice = 
      alojamiento.precio >= priceRange[0] && 
      alojamiento.precio <= priceRange[1];
    
    // Filtrar por capacidad
    const matchesCapacity = 
      !selectedCapacity || 
      (selectedCapacity === "1-2" && alojamiento.capacidad <= 2) ||
      (selectedCapacity === "3-4" && alojamiento.capacidad >= 3 && alojamiento.capacidad <= 4) ||
      (selectedCapacity === "5+" && alojamiento.capacidad >= 5);
    
    // Filtrar por categoría
    const matchesCategoria = 
      !selectedCategoria || 
      alojamiento.categoria === selectedCategoria;
    
    return matchesText && matchesPrice && matchesCapacity && matchesCategoria;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <HeroSection 
        title="Alojamientos en San Rafael"
        subtitle="Encuentra el lugar perfecto para descansar después de tus aventuras"
        showSearch={false}
        backgroundImage="/alojamientos/cabana1.jpg"
      />
      
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Buscador y filtros */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Buscar
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
                      defaultValue={[0, 50000]}
                      max={50000}
                      step={1000}
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
                    Capacidad
                  </label>
                  <Select onValueChange={setSelectedCapacity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar capacidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Cualquiera</SelectItem>
                      <SelectItem value="1-2">1-2 personas</SelectItem>
                      <SelectItem value="3-4">3-4 personas</SelectItem>
                      <SelectItem value="5+">5+ personas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de alojamiento
                  </label>
                  <Select onValueChange={setSelectedCategoria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mascotas" />
                    <Label htmlFor="mascotas">Acepta mascotas</Label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Resultados */}
          <h2 className="text-2xl font-bold mb-6">
            {filteredAlojamientos.length} alojamientos encontrados
          </h2>
          
          {filteredAlojamientos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlojamientos.map((alojamiento) => (
                <FeatureCard
                  key={alojamiento.id}
                  id={alojamiento.id}
                  type="alojamiento"
                  title={alojamiento.titulo}
                  description={alojamiento.descripcion}
                  price={alojamiento.precio}
                  priceUnit={alojamiento.precioUnidad}
                  rating={alojamiento.rating}
                  image={alojamiento.imagen}
                  location={alojamiento.ubicacion}
                  tags={[alojamiento.categoria]}
                  capacity={alojamiento.capacidad}
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

export default AlojamientosPage;

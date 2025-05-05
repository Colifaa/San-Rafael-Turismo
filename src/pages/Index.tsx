
import HeroSection from "@/components/ui/hero-section";
import CategoryList from "@/components/ui/category-list";
import FeatureCard from "@/components/ui/feature-card";
import { Testimonial } from "@/components/ui/testimonial";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Star, Users, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const { alojamientos, actividades } = useApp();
  
  // Obtener alojamientos y actividades destacados
  const alojamientosDestacados = alojamientos.filter(a => a.destacado).slice(0, 3);
  const actividadesDestacadas = actividades.filter(a => a.destacado).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection 
        title="Descubre San Rafael, Mendoza"
        subtitle="Explora los mejores alojamientos y actividades en el sur mendocino"
        showSearch={true}
      />
      
      {/* Categorías */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Descubre Experiencias</h2>
          <CategoryList />
        </div>
      </section>
      
      {/* Alojamientos Destacados */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Alojamientos Destacados</h2>
            <Link to="/alojamientos" className="flex items-center text-brand-green font-medium">
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alojamientosDestacados.map((alojamiento) => (
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
        </div>
      </section>
      
      {/* Banner con CTA */}
      <section className="py-20 bg-cover bg-center relative text-white"
               style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/actividades/rafting.jpg')" }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Aventuras que no olvidarás</h2>
            <p className="text-xl mb-8">
              San Rafael tiene para ofrecerte experiencias únicas rodeado de naturaleza, ríos y montañas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/actividades?categoria=aventura">
                <Button size="lg" className="bg-brand-orange hover:bg-orange-600">
                  Explorar aventuras
                </Button>
              </Link>
              <Link to="/alojamientos">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                  Ver alojamientos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Actividades Destacadas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Actividades Destacadas</h2>
            <Link to="/actividades" className="flex items-center text-brand-green font-medium">
              Ver todas <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actividadesDestacadas.map((actividad) => (
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
        </div>
      </section>
      
      {/* Por qué elegirnos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-beige p-5 rounded-full inline-flex justify-center items-center mb-4">
                <Star className="h-8 w-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Los mejores servicios</h3>
              <p className="text-gray-600">Todos nuestros prestadores son verificados y evaluados continuamente.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-beige p-5 rounded-full inline-flex justify-center items-center mb-4">
                <Users className="h-8 w-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Atención personalizada</h3>
              <p className="text-gray-600">Te asistimos en todo el proceso, desde la selección hasta el regreso a casa.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-beige p-5 rounded-full inline-flex justify-center items-center mb-4">
                <Calendar className="h-8 w-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reservas flexibles</h3>
              <p className="text-gray-600">Políticas de cancelación adaptadas a tus necesidades de viaje.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-beige p-5 rounded-full inline-flex justify-center items-center mb-4">
                <MapPin className="h-8 w-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Conocimiento local</h3>
              <p className="text-gray-600">Expertos en San Rafael para ofrecerte los mejores consejos y recomendaciones.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros viajeros</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Testimonial 
              name="Laura Rodríguez"
              location="Buenos Aires, Argentina"
              text="¡Experiencia increíble! Las cabañas eran hermosas y muy limpias. El rafting fue la mejor parte del viaje, los guías muy profesionales y divertidos."
              rating={5}
            />
            <Testimonial 
              name="Carlos Méndez"
              location="Córdoba, Argentina"
              text="Viajamos en familia y todos quedamos encantados. El tour de bodegas estuvo excelente, muy buen servicio y atención personalizada."
              rating={5}
            />
            <Testimonial 
              name="Marcela Gómez"
              location="Rosario, Argentina"
              text="La cabalgata al atardecer fue mágica, un recuerdo que quedará para siempre. Además el alojamiento era perfecto, con todas las comodidades."
              rating={4}
            />
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green/10">
              Ver más testimonios
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-brand-green text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Suscríbete a nuestro newsletter</h2>
            <p className="mb-6">Recibe las mejores ofertas y novedades sobre San Rafael directamente en tu email.</p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="px-4 py-3 rounded-md flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <Button className="bg-brand-orange hover:bg-orange-600">
                Suscribirme
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

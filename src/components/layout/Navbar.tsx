
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-brand-green">
              Explora<span className="text-brand-blue">Viajes</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/alojamientos" className="text-gray-700 hover:text-brand-green font-medium">
              Alojamientos
            </Link>
            <Link to="/actividades" className="text-gray-700 hover:text-brand-green font-medium">
              Actividades
            </Link>
            <Link to="/experiencias" className="text-gray-700 hover:text-brand-green font-medium">
              Experiencias
            </Link>
            <Link to="/contacto" className="text-gray-700 hover:text-brand-green font-medium">
              Contacto
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search size={20} className="mr-2" />
              Buscar
            </Button>
            <Button variant="ghost" size="sm">
              <User size={20} className="mr-2" />
              Ingresar
            </Button>
            <Button className="bg-brand-orange hover:bg-orange-600">Publicar servicio</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                to="/alojamientos"
                className="px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Alojamientos
              </Link>
              <Link
                to="/actividades"
                className="px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Actividades
              </Link>
              <Link
                to="/experiencias"
                className="px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Experiencias
              </Link>
              <Link
                to="/contacto"
                className="px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-2 border-t">
                <Button className="w-full mb-2" variant="outline">
                  <User size={16} className="mr-2" />
                  Ingresar
                </Button>
                <Button className="w-full bg-brand-orange hover:bg-orange-600">
                  Publicar servicio
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

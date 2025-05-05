
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre ExploraViajes</h3>
            <p className="text-gray-300 mb-4">
              Marketplace de experiencias turísticas en San Rafael, Mendoza. Conectamos viajeros 
              con alojamientos y actividades únicas en la región.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/alojamientos" className="text-gray-300 hover:text-white">
                  Alojamientos
                </Link>
              </li>
              <li>
                <Link to="/actividades" className="text-gray-300 hover:text-white">
                  Actividades
                </Link>
              </li>
              <li>
                <Link to="/experiencias" className="text-gray-300 hover:text-white">
                  Experiencias
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">
                  Blog de viajes
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/preguntas-frecuentes" className="text-gray-300 hover:text-white">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link to="/politicas" className="text-gray-300 hover:text-white">
                  Políticas de cancelación
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-gray-300 hover:text-white">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/prestadores" className="text-gray-300 hover:text-white">
                  Ser prestador
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  Av. Hipólito Yrigoyen 380, San Rafael, Mendoza, Argentina
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a href="tel:+542604123456" className="text-gray-300 hover:text-white">
                  +54 260 412-3456
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@exploraviajes.com" className="text-gray-300 hover:text-white">
                  info@exploraviajes.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} ExploraViajes. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

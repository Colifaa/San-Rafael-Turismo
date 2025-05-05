
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  id: string;
  type: 'alojamiento' | 'actividad';
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  rating: number;
  image: string;
  location: string;
  tags?: string[];
  capacity?: number;
}

const FeatureCard = ({
  id,
  type,
  title,
  description,
  price,
  priceUnit,
  rating,
  image,
  location,
  tags = [],
  capacity
}: FeatureCardProps) => {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(price);
  
  const baseUrl = type === 'alojamiento' ? '/alojamientos' : '/actividades';
  const detailUrl = `${baseUrl}/${id}`;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden card-hover">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {tags.length > 0 && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-brand-orange text-white">
              {tags[0]}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <span className="text-lg font-bold">{formattedPrice}</span>
            <span className="text-sm text-gray-500"> {priceUnit}</span>
            
            {capacity && (
              <div className="flex items-center text-sm mt-1">
                <Users size={14} className="mr-1 text-gray-500" />
                <span className="text-gray-500">Hasta {capacity} personas</span>
              </div>
            )}
          </div>
          
          <Link to={detailUrl}>
            <Button variant="default" size="sm">
              {type === 'alojamiento' ? 'Reservar' : 'Ver detalles'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;

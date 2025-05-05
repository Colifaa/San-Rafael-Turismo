
import { Link } from "react-router-dom";
import { Mountain, Tent, Waves, Bike, Trees, Droplets } from "lucide-react";

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  path: string;
}

const Category = ({ icon, name, path }: CategoryProps) => {
  return (
    <Link to={path} className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg card-hover">
      <div className="bg-brand-beige p-4 rounded-full mb-3">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </Link>
  );
};

const CategoryList = () => {
  const categories = [
    { 
      icon: <Tent size={24} className="text-brand-green" />, 
      name: "Alojamientos", 
      path: "/alojamientos" 
    },
    { 
      icon: <Mountain size={24} className="text-brand-green" />, 
      name: "Aventura", 
      path: "/actividades?categoria=aventura" 
    },
    { 
      icon: <Droplets size={24} className="text-brand-green" />, 
      name: "Termas", 
      path: "/actividades?categoria=termas" 
    },
    { 
      icon: <Waves size={24} className="text-brand-green" />, 
      name: "Río", 
      path: "/actividades?categoria=rio" 
    },
    { 
      icon: <Bike size={24} className="text-brand-green" />, 
      name: "Ciclismo", 
      path: "/actividades?categoria=ciclismo" 
    },
    { 
      icon: <Trees size={24} className="text-brand-green" />, 
      name: "Naturaleza", 
      path: "/actividades?categoria=naturaleza" 
    },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
      {categories.map((category, index) => (
        <Category key={index} {...category} />
      ))}
    </div>
  );
};

export default CategoryList;

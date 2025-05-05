
import SearchBox from "@/components/ui/search-box";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  showSearch?: boolean;
  backgroundImage?: string;
  centered?: boolean;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  showSearch = true,
  backgroundImage,
  centered = false
}: HeroSectionProps) => {
  const bgClass = backgroundImage 
    ? `bg-cover bg-center bg-no-repeat`
    : "hero-pattern";
  
  const style = backgroundImage 
    ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${backgroundImage})` }
    : {};
  
  return (
    <div 
      className={`${bgClass} text-white ${centered ? "py-32" : "pt-20 pb-32"} relative`}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl ${centered ? "text-center mx-auto" : ""}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            {subtitle}
          </p>
          
          {!showSearch && (
            <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white">
              Descubrir San Rafael
            </Button>
          )}
        </div>
        
        {showSearch && (
          <div className={`mt-8 ${centered ? "mx-auto" : ""}`}>
            <SearchBox />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;


import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
}

export function Testimonial({ name, location, text, rating, image }: TestimonialProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="rounded-full bg-gray-200 h-12 w-12 overflow-hidden flex-shrink-0">
            {image ? (
              <img src={image} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-brand-green/20 flex items-center justify-center text-brand-green font-bold text-lg">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>
        
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
            />
          ))}
        </div>
        
        <p className="text-gray-600 text-balance">{text}</p>
      </CardContent>
    </Card>
  );
}

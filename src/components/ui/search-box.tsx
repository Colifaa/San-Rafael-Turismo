
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const SearchBox = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [guests, setGuests] = React.useState(2);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-4xl w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Destino */}
        <div className="relative">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destino
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="destination"
              placeholder="San Rafael, Mendoza"
              className="pl-10"
              defaultValue="San Rafael"
            />
          </div>
        </div>

        {/* Fecha */}
        <div>
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
                locale={es}
                className="p-3"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Huéspedes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personas
          </label>
          <div className="flex border rounded-md">
            <button
              type="button"
              className="px-3 py-2 border-r"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <div className="flex-1 flex items-center justify-center">
              <Users size={16} className="mr-2 text-gray-500" />
              <span>{guests}</span>
            </div>
            <button
              type="button"
              className="px-3 py-2 border-l"
              onClick={() => setGuests(guests + 1)}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>

        {/* Botón buscar */}
        <div className="flex items-end">
          <Button className="w-full bg-brand-green hover:bg-green-700">
            <Search size={18} className="mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

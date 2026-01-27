import { motion } from 'framer-motion';
import { MapPin, Headphones, Sparkles } from 'lucide-react';
import { POIS, type POI } from '@/data/pois';
import { cn } from '@/lib/utils';

interface PoiListProps {
  selectedPoi: POI | null;
  onSelect: (poi: POI) => void;
}

const PoiList = ({ selectedPoi, onSelect }: PoiListProps) => {
  return (
    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 pb-20 md:pb-4">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl flex-shrink-0">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-foreground">
          Puntos de Interés
        </h2>
      </div>
      
      {POIS.map((poi, index) => (
        <motion.button
          key={poi.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(poi)}
          className={cn(
            "w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all",
            "bg-card hover:bg-secondary/80 border-2 border-transparent shadow-sm hover:shadow-md",
            selectedPoi?.id === poi.id && "border-primary bg-primary/5"
          )}
        >
          {/* Order number */}
          <div className={cn(
            "w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all",
            selectedPoi?.id === poi.id 
              ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg" 
              : "bg-secondary text-secondary-foreground"
          )}>
            {poi.order}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
              {poi.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{poi.description.slice(0, 30)}...</span>
            </p>
          </div>
          
          {/* Audio indicator */}
          <div className="bg-secondary p-1.5 sm:p-2 rounded-full flex-shrink-0">
            <Headphones className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default PoiList;

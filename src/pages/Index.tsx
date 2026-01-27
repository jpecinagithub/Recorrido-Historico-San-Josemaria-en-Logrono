import { useState } from 'react';
import { List, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MapView from '@/components/MapView';
import PoiList from '@/components/PoiList';
import PoiDrawer from '@/components/PoiDrawer';
import type { POI } from '@/data/pois';
import { cn } from '@/lib/utils';

const Index = () => {
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [showList, setShowList] = useState(false);

  const handlePoiSelect = (poi: POI) => {
    setSelectedPoi(poi);
    setShowList(false);
  };

  const handleClose = () => {
    setSelectedPoi(null);
  };

  return (
    <div className="h-[calc(100dvh-4rem)] mt-16 relative flex flex-col md:flex-row">
      {/* List (desktop sidebar) */}
      <div className={cn(
        "hidden md:block md:w-80 lg:w-96 md:flex-shrink-0 md:border-r md:border-border overflow-y-auto scrollbar-hide"
      )}>
        <PoiList 
          selectedPoi={selectedPoi} 
          onSelect={handlePoiSelect} 
        />
      </div>

      {/* Map */}
      <div className={cn(
        "flex-1 relative transition-opacity duration-300",
        showList ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto" : "opacity-100"
      )}>
        <MapView 
          selectedPoi={selectedPoi} 
          onPoiSelect={handlePoiSelect} 
        />
      </div>
      
      {/* List (mobile overlay) */}
      <div className={cn(
        "fixed inset-0 top-16 bg-background overflow-y-auto transition-transform duration-300 z-30 md:hidden scrollbar-hide",
        showList ? "translate-x-0" : "translate-x-full"
      )}>
        <PoiList 
          selectedPoi={selectedPoi} 
          onSelect={handlePoiSelect} 
        />
      </div>
      
      {/* Toggle button (mobile) */}
      <Button
        onClick={() => setShowList(!showList)}
        size="icon"
        className="fixed bottom-6 right-4 z-40 h-14 w-14 rounded-full shadow-xl bg-gradient-to-br from-primary to-accent hover:opacity-90 md:hidden"
        aria-label={showList ? 'Ver mapa' : 'Ver lista'}
      >
        {showList ? (
          <MapIcon className="h-6 w-6 text-white" />
        ) : (
          <List className="h-6 w-6 text-white" />
        )}
      </Button>
      
      {/* POI Drawer */}
      <PoiDrawer 
        poi={selectedPoi} 
        onClose={handleClose} 
      />
    </div>
  );
};

export default Index;

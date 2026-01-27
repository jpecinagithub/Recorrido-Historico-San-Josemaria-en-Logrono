import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { POIS, MAP_CENTER, MAP_ZOOM, type POI } from '@/data/pois';
import { Loader2 } from 'lucide-react';

interface MapViewProps {
  selectedPoi: POI | null;
  onPoiSelect: (poi: POI) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

const MapView = ({ selectedPoi, onPoiSelect }: MapViewProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCHhW6RGwsJKWzIukbHD-cn0ZRiq36A638',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    POIS.forEach((poi) => {
      bounds.extend({ lat: poi.lat, lng: poi.lng });
    });
    map.fitBounds(bounds, 60);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (poi: POI) => {
    onPoiSelect(poi);
    if (map) {
      map.panTo({ lat: poi.lat, lng: poi.lng });
    }
  };

  // Create polyline path
  const routePath = POIS.sort((a, b) => a.order - b.order).map((poi) => ({
    lat: poi.lat,
    lng: poi.lng,
  }));

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <div className="text-center p-4">
          <p className="text-destructive font-medium">Error al cargar el mapa</p>
          <p className="text-sm text-muted-foreground mt-1">
            Por favor, recarga la página
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {/* Route polyline */}
      <Polyline
        path={routePath}
        options={{
          strokeColor: '#8B5A2B',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          geodesic: true,
        }}
      />

      {/* POI markers */}
      {POIS.map((poi) => (
        <Marker
          key={poi.id}
          position={{ lat: poi.lat, lng: poi.lng }}
          onClick={() => handleMarkerClick(poi)}
          label={{
            text: poi.order.toString(),
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 18,
            fillColor: selectedPoi?.id === poi.id ? '#B8860B' : '#8B5A2B',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 3,
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;

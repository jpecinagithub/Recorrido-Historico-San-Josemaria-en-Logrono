import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { POIS, MAP_CENTER, MAP_ZOOM, type POI } from '@/data/pois';

interface MapViewProps {
  selectedPoi: POI | null;
  onPoiSelect: (poi: POI) => void;
}

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

const poiIcon = (order: number, isSelected: boolean) =>
  L.divIcon({
    className: '',
    html: `<div class="poi-marker${isSelected ? ' selected' : ''}"><span>${order}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

const FitToPois = ({ points }: { points: LatLngExpression[] }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [map, points]);

  return null;
};

const PanToSelected = ({ poi }: { poi: POI | null }) => {
  const map = useMap();

  useEffect(() => {
    if (!poi) return;
    map.panTo([poi.lat, poi.lng], { animate: true });
  }, [map, poi]);

  return null;
};

const MapView = ({ selectedPoi, onPoiSelect }: MapViewProps) => {
  // Avoid mutating POIS with .sort() in render.
  const sortedPois = useMemo(() => [...POIS].sort((a, b) => a.order - b.order), []);

  const routePath = useMemo(
    () => sortedPois.map((poi) => [poi.lat, poi.lng] as LatLngExpression),
    [sortedPois]
  );

  return (
    <MapContainer
      style={mapContainerStyle}
      center={[MAP_CENTER.lat, MAP_CENTER.lng]}
      zoom={MAP_ZOOM}
      zoomControl
      attributionControl
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <FitToPois points={routePath} />
      <PanToSelected poi={selectedPoi} />

      <Polyline
        positions={routePath}
        pathOptions={{
          color: '#8B5A2B',
          opacity: 0.8,
          weight: 4,
        }}
      />

      {sortedPois.map((poi) => (
        <Marker
          key={poi.id}
          position={[poi.lat, poi.lng]}
          icon={poiIcon(poi.order, selectedPoi?.id === poi.id)}
          eventHandlers={{ click: () => onPoiSelect(poi) }}
        />
      ))}
    </MapContainer>
  );
};

export default MapView;


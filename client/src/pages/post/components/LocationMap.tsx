import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LatLng {
  lat: number;
  lng: number;
}

interface LocationMapProps {
  onLocationChange: (latLng: LatLng) => void;
}

const LocationMarker: React.FC<{
  onLocationSelected: (latLng: LatLng) => void;
}> = ({ onLocationSelected }) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      onLocationSelected({ lat, lng });
    }
  });

  return position ? <Marker position={position}></Marker> : null;
};

const LocationMap: React.FC<LocationMapProps> = ({ onLocationChange }) => {

  const handleLocationSelected = (latLng: LatLng) => {
    onLocationChange(latLng);
  };

  return (
    <div className="z-0">
      <MapContainer
        className="rounded-md w-full h-52 z-0"
        center={[11.554304053577502, 104.84582522884013]}
        zoom={9}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelected={handleLocationSelected} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
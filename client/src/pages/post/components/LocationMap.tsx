import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LatLng {
  lat: number;
  lng: number;
}

const LocationMarker: React.FC<{
  onLocationSelected: (latLng: LatLng, address: string) => void;
}> = ({ onLocationSelected }) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });

      // Reverse geocoding with OpenStreetMap
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "User-Agent": "YourAppName/1.0 (your@email.com)"
          }
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const address = data.display_name || "";
          onLocationSelected({ lat, lng }, address);
        });
    }
  });

  return position ? <Marker position={position}></Marker> : null;
};

const LocationMap: React.FC = () => {
  const [selectedLatLng, setSelectedLatLng] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>("");

  const handleLocationSelected = (latLng: LatLng, addr: string) => {
    setSelectedLatLng(latLng);
    console.log(latLng);
    setAddress(addr);
  };

  return (
    <div>
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

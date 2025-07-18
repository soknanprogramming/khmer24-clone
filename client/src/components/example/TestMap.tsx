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

const MapComponent: React.FC = () => {
  const [selectedLatLng, setSelectedLatLng] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>("");

  const handleLocationSelected = (latLng: LatLng, addr: string) => {
    setSelectedLatLng(latLng);
    setAddress(addr);
  };

  return (
    <div>
      <MapContainer
        center={[12.5657, 104.9910]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelected={handleLocationSelected} />
      </MapContainer>

      <div className="mt-4">
        <label>
          Latitude:
          <input
            type="text"
            value={selectedLatLng?.lat || ""}
            readOnly
            className="border p-1 ml-2"
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="text"
            value={selectedLatLng?.lng || ""}
            readOnly
            className="border p-1 ml-2"
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            readOnly
            className="border p-1 ml-2"
          />
        </label>
      </div>
    </div>
  );
};

export default MapComponent;

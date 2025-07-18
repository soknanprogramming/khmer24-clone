import React, { useState, useEffect } from "react";
import Popup from "../../../components/Popup";
import axios from "axios";

type LocationInCambodia = {
  id: number;
  name: string;
  districts: {
    id: number;
    name: string;
    communes: {
      id: number;
      name: string;
    }[];
  }[];
}[];

type LocationPopupProp = {
  setCityId: React.Dispatch<React.SetStateAction<number | null>>;
  cityId: number | null;
  setDistrictsId: React.Dispatch<React.SetStateAction<number | null>>;
  districtsId: number | null;
  setCommunesId: React.Dispatch<React.SetStateAction<number | null>>;
  communesId: number | null;
};

type SelectionState = "City" | "Districts" | "Communes";

const LocationPopup: React.FC<LocationPopupProp> = ({
  setCityId,
  cityId,
  setDistrictsId,
  districtsId,
  setCommunesId,
  communesId,
}) => {
  const [selectStep, setSelectStep] = useState<SelectionState>("City");
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("")
  const [districtName, setDistrictName] = useState<string>("")
  const [communeName, setCommuneName] = useState<string>("")
  const [locationData, setLocationData] = useState<LocationInCambodia>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    setCityId(null)
    setCityName("")
    setDistrictsId(null)
    setDistrictName("")
    setCommunesId(null)
    setCommuneName("")
    setSelectStep("City")
  }
  
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<LocationInCambodia>(`${apiUrl}/api/locations`);
        setLocationData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("Failed to fetch locations");
        }
        console.error("Error fetching locations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="cursor-pointer flex items-center h-full">
          <input
            type="text"
            className="w-full h-11 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3"
            readOnly
            value="Loading locations..."
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="cursor-pointer flex items-center h-full">
          <input
            type="text"
            className="w-full h-11 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 px-3"
            readOnly
            value="Error loading locations"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        onClick={() => setPopupOpen(true)}
        className="cursor-pointer flex items-center h-full"
      >
        <input
          type="text"
          className="w-full h-11 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3"
          readOnly
          value={
            cityId && districtsId && communesId
                ? `${cityName}, ${districtName}, ${communeName}`
                : ""
          }
        />
      </div>
      <Popup
        className="overflow-y-scroll !p-0 h-4/5 z-100 w-xl border-2 border-green-600"
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
      >
        <div className="">
          {/* City Selection */}
          {selectStep === "City" ? (
            <div id="City">
              <h1 onClick={handleReset} className="bg-green-500 p-2 text-2xl w-full">City</h1>
              {locationData.map((city) => (
                <p
                  key={city.id}
                  onClick={() => {
                    setCityId(city.id);
                    setCityName(city.name)
                    setDistrictsId(null); // reset district
                    setCommunesId(null); // reset commune
                    setSelectStep("Districts");
                  }}
                  className="p-2 border-b hover:bg-gray-50 cursor-pointer"
                >
                  {city.name}
                </p>
              ))}
            </div>
          ) : null}

          {/* District Selection */}
          {selectStep === "Districts" ? (
            <div id="Districts">
              <h1 onClick={handleReset} className="bg-green-500 p-2 text-2xl w-full">Districts</h1>
              {cityId !== null &&
                locationData
                  .find((city) => city.id === cityId)
                  ?.districts.map((district) => (
                    <p
                      key={district.id}
                      onClick={() => {
                        setDistrictsId(district.id);
                        setDistrictName(district.name)
                        setCommunesId(null); // reset commune
                        setSelectStep("Communes");
                      }}
                      className="p-2 border-b hover:bg-gray-50 cursor-pointer"
                    >
                      {district.name}
                    </p>
                  ))}
            </div>
          ) : null}

          {/* Commune Selection */}
          {selectStep === "Communes" ? (
            <div id="Communes">
              <h1 onClick={handleReset} className="bg-green-500 p-2 text-2xl w-full">Communes</h1>
              {cityId !== null &&
                districtsId !== null &&
                locationData
                  .find((city) => city.id === cityId)
                  ?.districts.find(
                    (district) => district.id === districtsId
                  )
                  ?.communes.map((commune) => (
                    <p
                      key={commune.id}
                      onClick={() => {
                        setCommunesId(commune.id);
                        setCommuneName(commune.name)
                        setPopupOpen(false);
                        setSelectStep("City");
                      }}
                      className="p-2 border-b hover:bg-gray-50 cursor-pointer"
                    >
                      {commune.name}
                    </p>
                  ))}
            </div>
          ) : null}
        </div>
      </Popup>
    </div>
  );
};

export default LocationPopup;

// src/store/useSellRequirements.ts
import { create } from "zustand";
import axios from "axios";

// This type defines the structure of the API response
type SellRequirements = {
    productName: boolean,
    ProductBrand: boolean,
    TaxType: boolean,
    Condition: boolean,
    Color: boolean,
    Transmission: boolean,
    EngineType: boolean,
    BodyType: boolean,
    Vga: boolean,
    Ram: boolean,
    Storage: boolean,
    Screen: boolean,
    Price: boolean,
    Discount: boolean,
    IsFreeDelivery: boolean,
    Description: boolean,
    City: boolean,
    District: boolean,
    Commune: boolean,
    Address: boolean,
    Latitude: boolean,
    Longitude: boolean,
    CreatedDate: boolean,
};



type RequirementsState = {
  requirements: SellRequirements | null;
  loading: boolean;
  error: string | null;
  fetchRequirements: (categoryId: number) => Promise<void>;
};

const apiUrl = import.meta.env.VITE_API_URL;

const useSellRequirements = create<RequirementsState>((set) => ({
  requirements: null,
  loading: false,
  error: null,
  fetchRequirements: async (categoryId: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<SellRequirements[]>(`${apiUrl}/api/productSellRequirement/${categoryId}`);
      // The API returns an array, so we take the first element
      if (response.data && response.data.length > 0) {
        set({ requirements: response.data[0], loading: false });
        console.log("Fetched requirements:", response.data[0]);
      } else {
        throw new Error("No requirements found for this category.");
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err.message : String(err);
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useSellRequirements;
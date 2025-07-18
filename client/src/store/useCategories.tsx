import { create } from "zustand";
import axios from "axios";

export type mainAndSubCategories = {
  mainCategory: {
    id: number;
    name: string;
    icon: string;
  };
  subCategories: {
    id: number;
    name: string;
    icon: string;
  }[];
};

type CategoriesState = {
  categories: mainAndSubCategories[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
};

const apiUrl = import.meta.env.VITE_API_URL;

const useCategories = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<mainAndSubCategories[]>(
        `${apiUrl}/api/productCategory`
      );
      set({ categories: response.data, loading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: String(err), loading: false });
      }
    }
  },
}));

export default useCategories;

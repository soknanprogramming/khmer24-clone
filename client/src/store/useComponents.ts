import { create } from "zustand";
import axios from "axios";

type Component = {
  ID: number;
  Name: string;
};

type ComponentsState = {
  vga: Component[];
  cpu: Component[];
  ram: Component[];
  storage: Component[];
  screen: Component[];
  loading: boolean;
  error: string | null;
  fetchVGA: () => Promise<void>;
  fetchCPU: () => Promise<void>;
  fetchRAM: () => Promise<void>;
  fetchStorage: () => Promise<void>;
  fetchScreen: () => Promise<void>;
  fetchAllComponents: () => Promise<void>;
};

const apiUrl = import.meta.env.VITE_API_URL;

const useComponents = create<ComponentsState>((set, get) => ({
  vga: [],
  cpu: [],
  ram: [],
  storage: [],
  screen: [],
  loading: false,
  error: null,

  fetchVGA: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Component[]>(`${apiUrl}/api/components/vga`);
      const data = Array.isArray(response.data) ? response.data : [];
      set({ vga: data, loading: false });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err.message : String(err);
      set({ error: errorMessage, loading: false });
    }
  },

  fetchCPU: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Component[]>(`${apiUrl}/api/components/cpu`);
      const data = Array.isArray(response.data) ? response.data : [];
      set({ cpu: data, loading: false });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err.message : String(err);
      set({ error: errorMessage, loading: false });
    }
  },

  fetchRAM: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Component[]>(`${apiUrl}/api/components/ram`);
      const data = Array.isArray(response.data) ? response.data : [];
      set({ ram: data, loading: false });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err.message : String(err);
      set({ error: errorMessage, loading: false });
    }
  },

  fetchStorage: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Component[]>(`${apiUrl}/api/components/storage`);
      const data = Array.isArray(response.data) ? response.data : [];
      set({ storage: data, loading: false });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err.message : String(err);
      set({ error: errorMessage, loading: false });
    }
  },

  fetchScreen: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Component[]>(`${apiUrl}/api/components/screen`);
      const data = Array.isArray(response.data) ? response.data : [];
      set({ screen: data, loading: false });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err.message : String(err);
      set({ error: errorMessage, loading: false });
    }
  },

  fetchAllComponents: async () => {
    set({ loading: true, error: null });
    try {
      const [vgaRes, cpuRes, ramRes, storageRes, screenRes] = await Promise.all([
        axios.get<Component[]>(`${apiUrl}/api/components/vga`),
        axios.get<Component[]>(`${apiUrl}/api/components/cpu`),
        axios.get<Component[]>(`${apiUrl}/api/components/ram`),
        axios.get<Component[]>(`${apiUrl}/api/components/storage`),
        axios.get<Component[]>(`${apiUrl}/api/components/screen`),
      ]);

      set({
        vga: Array.isArray(vgaRes.data) ? vgaRes.data : [],
        cpu: Array.isArray(cpuRes.data) ? cpuRes.data : [],
        ram: Array.isArray(ramRes.data) ? ramRes.data : [],
        storage: Array.isArray(storageRes.data) ? storageRes.data : [],
        screen: Array.isArray(screenRes.data) ? screenRes.data : [],
        loading: false,
      });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err.message : String(err);
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useComponents; 
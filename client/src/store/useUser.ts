import { create } from "zustand";
import axios from "axios";

// {userName : UserName, firstName: FirstName, lastName: LastName}
type User = {
  userName: string;
  firstName: string;
  lastName: string;
};

// user login state
type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (phoneNumber: string, password: string) => Promise<void>;
  status: () => Promise<void>;
  logout: () => void;
};

const apiUrl = import.meta.env.VITE_API_URL;

const useUser = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (phoneNumber, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${apiUrl}/api/auth`, {
        phoneNumber,
        password,
      }, { withCredentials: true });
      if (response.status === 401) throw new Error("Unauthorized");
      set({ user: response.data, loading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: String(err), loading: false });
      }
    }
  },

  status: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${apiUrl}/api/auth/status`,
        { withCredentials: true }
      );
      set({ user: response.data, loading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // set({ error: err.message, loading: false });
        set({ error: "Please Login", loading: false });
      } else {
        set({ error: String(err), loading: false });
      }
    }
  },

  logout: () => {
    set({ loading: true, error: null });
    try {
        axios.post(`${apiUrl}/api/auth/logout`,
            {},
            { withCredentials: true }
        );
        set({ user: null, loading: false, error: null });
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: String(err), loading: false });
      }
    }
  },
}));


export default useUser;
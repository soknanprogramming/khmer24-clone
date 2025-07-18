import { create } from "zustand";

type LangStore = {
  lang: "km" | "en";
  changeLang: () => void;
};

const useLang = create<LangStore>((set, get) => ({
  lang: "en",
  changeLang: () => {
    const currentLang = get().lang; // now get() knows about lang
    set({
      lang: currentLang === "km" ? "en" : "km",
    });
  },
}));

export default useLang;

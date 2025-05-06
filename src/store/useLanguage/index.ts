import { getLanguageStorage, setLanguageStorage } from "@/utils/storage";
import { create } from "zustand";


export type RootState = {
  lang: string;
};

type Actions = {
  setLanguage: (lang: string) => void;
  unSetLanguage: () => void;
};

const useLanguage = create<RootState & Actions>((set) => ({
  lang: getLanguageStorage() ?? "vi",
  setLanguage: (lang) => {
    set(() => ({ lang: lang }));
    setLanguageStorage(lang);
  },
  unSetLanguage: () => set(() => ({ lang: "vi" })),
}));

export default useLanguage;

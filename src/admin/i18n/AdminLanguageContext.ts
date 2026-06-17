import { createContext, useContext } from "react";
import {
  adminTranslations,
  type AdminLanguage,
  type AdminTranslationKey,
} from "./adminTranslations";

export interface AdminLanguageContextValue {
  dir: "ltr" | "rtl";
  language: AdminLanguage;
  setLanguage: (language: AdminLanguage) => void;
  t: (key: AdminTranslationKey) => string;
}

export const AdminLanguageContext = createContext<AdminLanguageContextValue>({
  dir: "ltr",
  language: "en",
  setLanguage: () => undefined,
  t: (key) => adminTranslations.en[key],
});

export function useAdminLanguage() {
  return useContext(AdminLanguageContext);
}

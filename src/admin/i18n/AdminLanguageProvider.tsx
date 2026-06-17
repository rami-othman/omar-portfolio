import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  type AdminLanguage,
  adminTranslations,
} from "./adminTranslations";
import {
  AdminLanguageContext,
  type AdminLanguageContextValue,
} from "./AdminLanguageContext";

const storageKey = "omar-admin-language";

function getInitialLanguage(): AdminLanguage {
  if (typeof window === "undefined") {
    return "en";
  }

  return window.localStorage.getItem(storageKey) === "ar" ? "ar" : "en";
}

export function AdminLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AdminLanguage>(getInitialLanguage);

  function setLanguage(nextLanguage: AdminLanguage) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
  }

  const value = useMemo<AdminLanguageContextValue>(
    () => ({
      dir: language === "ar" ? "rtl" : "ltr",
      language,
      setLanguage,
      t: (key) => adminTranslations[language][key],
    }),
    [language],
  );

  return (
    <AdminLanguageContext.Provider value={value}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

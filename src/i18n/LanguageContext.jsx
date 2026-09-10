import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("norma-lang") || "bg";
    } catch {
      return "bg";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("norma-lang", lang);
    } catch {
      // localStorage може да не е налично (напр. private mode) -- игнорирай го
    }
  }, [lang]);

  function toggleLang() {
    setLang((l) => (l === "bg" ? "en" : "bg"));
  }

  // t(path) -- διαβάζει μια τιμή από το λεξικό μεταφράσεων μέσω "dot path",
  // π.χ. t("hero.title1")
  function t(path) {
    const parts = path.split(".");
    let node = translations[lang];
    for (const p of parts) {
      node = node?.[p];
    }
    return node ?? path;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

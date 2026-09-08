import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 bg-ink/5 dark:bg-white/5 border border-ink/5 dark:border-white/10 p-1.5 rounded-full">
      <button
        onClick={() => setLanguage("fr")}
        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
          language === "fr"
            ? "bg-ink dark:bg-clay text-white shadow-sm"
            : "text-ink/40 dark:text-white/40 hover:text-ink dark:hover:text-white"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
          language === "en"
            ? "bg-ink dark:bg-clay text-white shadow-sm"
            : "text-ink/40 dark:text-white/40 hover:text-ink dark:hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}

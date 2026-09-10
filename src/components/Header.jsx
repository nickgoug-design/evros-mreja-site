import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { asset } from "../utils/asset.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { lang, setLang, t } = useLanguage();

  const links = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.company"), to: "/#about" },
    { label: t("nav.products"), to: "/products" },
    { label: t("nav.contact"), to: "/#contact" },
  ];

  // Στην αρχική, το header είναι διάφανο πάνω από το βίντεο μέχρι να κάνει scroll ο χρήστης.
  // Σε κάθε άλλη σελίδα παραμένει πάντα συμπαγές (δεν υπάρχει βίντεο από πίσω του να φανεί).
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const showSolidBg = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        showSolidBg ? "bg-ink" : "bg-gradient-to-b from-ink/60 via-ink/20 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            {/* Πραγματικό λογότυπο */}
            <img src={asset("/images/norma-logo.png")} alt="NORMA S.A. лого" className="w-10 h-10 object-contain" />
          </Link>
          <div className="leading-tight">
            <Link to="/" className="block font-display font-600 text-white text-sm tracking-wide hover:text-accent transition-colors">
              NORMA S.A.
            </Link>
            <span className="block font-mono text-[9px] text-white/70 tracking-wide uppercase">
              СТОИЛУДИС ЙОАНИС А.Б.Е.Е.
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white/90 hover:text-white transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Κουμπί αλλαγής γλώσσας -- EL / EN */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setLang("bg")}
              className={`transition-colors ${lang === "bg" ? "text-white font-bold" : "text-white/40 hover:text-white/70"}`}
            >
              EL
            </button>
            <span className="text-white/30">/</span>
            <button
              onClick={() => setLang("en")}
              className={`transition-colors ${lang === "en" ? "text-white font-bold" : "text-white/40 hover:text-white/70"}`}
            >
              EN
            </button>
          </div>

          <Link
            to="/#contact"
            className="hidden md:inline-block bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 shadow-[0_0_0_0_rgba(31,95,168,0)] hover:shadow-[0_0_25px_6px_rgba(31,95,168,0.55)]"
          >
            {t("nav.cta")}
          </Link>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-white p-2"
            aria-label={menuOpen ? "Затваряне на менюто" : "Отваряне на менюто"}
            aria-expanded={menuOpen}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-white rounded transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 bg-white rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-0.5 bg-white rounded transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-ink-light ${menuOpen ? "max-h-96" : "max-h-0"}`}>
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white text-sm">
              {link.label}
            </Link>
          ))}
          {/* Κουμπί γλώσσας και στο mobile μενού */}
          <div className="flex items-center gap-1.5 font-mono text-xs pt-2 border-t border-white/10 mt-2">
            <button onClick={() => setLang("bg")} className={lang === "bg" ? "text-white font-bold" : "text-white/40"}>BG</button>
            <span className="text-white/30">/</span>
            <button onClick={() => setLang("en")} className={lang === "en" ? "text-white font-bold" : "text-white/40"}>EN</button>
          </div>
        </nav>
      </div>
    </header>
  );
}

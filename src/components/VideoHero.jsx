import { asset } from "../utils/asset.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function VideoHero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen overflow-hidden bg-ink">
      {/* Το βίντεο παίζει αυτόματα, σε loop, χωρίς ήχο */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={asset("/hero.mp4")}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Σκούρο overlay πάνω από το βίντεο ώστε το κείμενο να διαβάζεται καθαρά */}
      <div className="absolute inset-0 bg-ink/55" />

      <div className="relative h-full flex items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <h1 className="font-display font-700 text-5xl md:text-6xl text-white leading-tight mb-6">
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </h1>
          <p className="text-white/70 text-lg mb-9">{t("hero.subtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#products"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_0_0_rgba(31,95,168,0)] hover:shadow-[0_0_30px_8px_rgba(31,95,168,0.55)]"
            >
              {t("hero.cta")}
            </a>
          </div>
        </div>
      </div>

      {/* Trust-row: μικρά facts κάτω από τα κουμπιά, στυλ "λογότυπα πελατών" -- 
          εδώ βάζουμε πραγματικά στοιχεία αντί για λογότυπα που δεν έχουμε */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-ink/40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-x-10 gap-y-2">
          {[
            [t("hero.stat1v"), t("hero.stat1l")],
            [t("hero.stat2v"), t("hero.stat2l")],
            [t("hero.stat3v"), t("hero.stat3l")],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <div className="font-display font-700 text-sm text-white">{value}</div>
              <div className="font-mono text-[10px] uppercase tracking-wide text-white/50">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

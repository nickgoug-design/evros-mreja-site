import { Link } from "react-router-dom";
import { asset } from "../utils/asset.js";

export default function Hero() {
  return (
    <section className="bg-paper">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-16">
        {/* Μικρή ετικέτα -- brand continuity με το tag-motif */}
        <div className="tag-card inline-block px-4 py-2 -rotate-2 mb-10" style={{ "--rot": "-2deg" }}>
          <div className="pt-2 flex items-baseline gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wide text-steel">Από το</span>
            <span className="font-display font-700 text-accent">1976</span>
          </div>
        </div>

        {/* Μεγάλος, στοιβαγμένος τίτλος -- το κύριο typographic στοιχείο της σελίδας */}
        <h1 className="font-display font-700 text-ink leading-[0.92] tracking-tight">
          <span className="block text-[15vw] sm:text-[10vw] lg:text-[6.2rem]">Σύρμα</span>
          <span className="block text-[15vw] sm:text-[10vw] lg:text-[6.2rem]">που δένει</span>
          <span className="block text-[15vw] sm:text-[10vw] lg:text-[6.2rem] text-accent">&amp; κρατάει</span>
        </h1>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
          <p className="text-steel text-lg max-w-sm">
            Ζωπλαστικά δίχτυα, panel περιφράξεις και γαλβανιζέ τελάρα, φτιαγμένα
            στον Έβρο από το 1976.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-sm transition-colors"
            >
              Δείτε τα προϊόντα
            </Link>
            <a
              href="#contact"
              className="border-2 border-ink text-ink font-semibold px-6 py-3 rounded-sm hover:bg-ink hover:text-white transition-colors"
            >
              Ζητήστε προσφορά
            </a>
          </div>
        </div>
      </div>

      {/* Πραγματική φωτο, edge-to-edge, κάτω από τον τίτλο -- καθαρά typographic/εικόνα, χωρίς επιπλέον διάκοσμο */}
      <img
        src={asset("/images/product-01.jpg")}
        alt="Συρματόπλεγμα NORMA"
        className="w-full h-[38vh] sm:h-[46vh] object-cover"
      />
    </section>
  );
}

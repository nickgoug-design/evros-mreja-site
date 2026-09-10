import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { asset } from "../utils/asset.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Το πεδίο "img" δείχνει σε αρχείο μέσα στο public/images/.
// Το groupKey είναι σταθερό (αγγλικό) -- έτσι το φιλτράρισμα δεν "σπάει"
// όταν αλλάζει η γλώσσα εμφάνισης. Το κείμενο (title/desc/label ομάδας)
// έρχεται από το λεξικό μεταφράσεων μέσω t("products...").
const productMeta = [
  { code: "01", groupKey: "mesh", img: asset("/images/product-01.jpg") },
  { code: "02", groupKey: "mesh", img: asset("/images/product-02.jpg") },
  { code: "03", groupKey: "security", img: asset("/images/product-03.png") },
  { code: "04", groupKey: "mesh", img: asset("/images/product-04.png") },
  { code: "05", groupKey: "constructions", img: asset("/images/product-05.png") },
  { code: "06", groupKey: "equipment", img: asset("/images/product-06.png") },
];

const groupKeys = ["all", ...new Set(productMeta.map((p) => p.groupKey))];

export default function Products() {
  const { t } = useLanguage();

  const products = productMeta.map((p) => ({
    ...p,
    title: t(`products.items.${p.code}.title`),
    desc: t(`products.items.${p.code}.desc`),
  }));

  const [active, setActive] = useState("all");
  const [index, setIndex] = useState(0);
  const filtered = active === "all" ? products : products.filter((p) => p.groupKey === active);
  const n = filtered.length;

  function selectGroup(g) {
    setActive(g);
    setIndex(0);
  }

  // Infinite loop: το modulo κάνει τον δείκτη να "γυρίζει" σε κύκλο,
  // ποτέ δεν φτάνει σε "τέλος"
  function next() {
    setIndex((i) => (i + 1) % n);
  }
  function prev() {
    setIndex((i) => (i - 1 + n) % n);
  }

  // --- Drag για πλοήγηση στο carousel (ποντίκι + touch, μέσω Pointer Events) ---
  const dragRef = useRef({ isDown: false, startX: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  function onPointerDown(e) {
    dragRef.current = { isDown: true, startX: e.clientX };
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragRef.current.isDown) return;
    setDragOffset(e.clientX - dragRef.current.startX);
  }
  function onPointerUp() {
    if (!dragRef.current.isDown) return;
    const threshold = 60;
    if (dragOffset < -threshold) next();
    else if (dragOffset > threshold) prev();
    dragRef.current.isDown = false;
    setIsDragging(false);
    setDragOffset(0);
  }

  const activeItem = filtered[index];

  return (
    <section id="products" className="bg-ink py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-3">{t("products.kicker")}</p>
        <Reveal className="mb-8">
          <h2 className="font-display font-700 text-3xl md:text-4xl text-white">{t("products.heading")}</h2>
        </Reveal>

        <Reveal delay={60} className="mb-14">
          <div className="flex flex-wrap gap-2">
            {groupKeys.map((g) => (
              <button
                key={g}
                onClick={() => selectGroup(g)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide transition-colors ${
                  active === g
                    ? "bg-accent text-white"
                    : "text-white/50 hover:text-white border border-white/15"
                }`}
              >
                {t(`products.groups.${g === "all" ? "all" : g}`)}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Ο "κυκλικός" χώρος -- perspective ώστε οι πλάγιες κάρτες να γυρίζουν σε 3D.
          Το mesh-line-bg δίνει υφή στο φόντο αντί για flat χρώμα. */}
      <div
        className="relative h-[460px] mesh-line-bg cursor-grab active:cursor-grabbing"
        style={{ perspective: "1400px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Δύο "παλλόμενα" φώτα πίσω από τις κάρτες -- σπάνε το flat σκούρο φόντο */}
        <div
          className="pointer-events-none absolute inset-0 animate-pulse-glow"
          style={{ background: "radial-gradient(circle at 50% 55%, rgba(31,95,168,0.45), transparent 40%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 animate-pulse-glow"
          style={{
            background: "radial-gradient(circle at 20% 30%, rgba(92,114,144,0.25), transparent 35%)",
            animationDelay: "1.5s",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center select-none">
          {filtered.map((p, i) => {
            // Κυκλική απόσταση από την ενεργή κάρτα -- επιλέγει τη ΣΥΝΤΟΜΟΤΕΡΗ
            // κατεύθυνση γύρω από τον κύκλο, άρα το slider "γυρίζει" και δεν τελειώνει ποτέ
            let diff = i - index;
            if (diff > n / 2) diff -= n;
            if (diff < -n / 2) diff += n;

            const isActive = diff === 0;
            const hidden = Math.abs(diff) > 2;
            const liveOffset = dragOffset * 0.3; // η κίνηση κατά το drag είναι πιο "αργή" από το δάχτυλο, πιο φυσική

            return (
              <div
                key={p.code}
                className={`absolute ${isDragging ? "" : "transition-all duration-500 ease-out"}`}
                style={{
                  transform: `translateX(${diff * 165 + liveOffset}px) rotateY(${diff * -20}deg) scale(${1 - Math.abs(diff) * 0.12})`,
                  opacity: hidden ? 0 : 1 - Math.abs(diff) * 0.22,
                  zIndex: 10 - Math.abs(diff),
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  draggable={false}
                  // Το "βαρέλι" σχήμα -- ελλειπτική στρογγυλοποίηση πάνω/κάτω άκρη
                  style={{ borderRadius: "50% / 7%" }}
                  className={`w-[330px] h-[420px] object-cover transition-shadow duration-500 ${
                    isActive ? "shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)]" : "shadow-xl"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Βελάκια πλοήγησης -- κυκλικά, στυλ του template έμπνευσης */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          aria-label="Предишен продукт"
          className="w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white hover:text-ink transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          aria-label="Следващ продукт"
          className="w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white hover:text-ink transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Λεζάντα -- δείχνει τίτλο/περιγραφή ΜΟΝΟ της ενεργής κάρτας, αλλάζει με fade */}
      <div className="max-w-lg mx-auto px-6 text-center mt-8" key={activeItem?.code}>
        <div className="animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-1">
            <h3 className="font-display font-600 text-xl text-white">{activeItem?.title}</h3>
            <span className="font-mono text-[10px] text-accent">{activeItem?.code}</span>
          </div>
          <p className="text-white/50 text-sm">{activeItem?.desc}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <Reveal delay={100} className="mt-16">
          <Link
            to="/products"
            className="group tag-card flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <LayoutGrid className="text-accent" size={22} strokeWidth={1.75} />
              </div>
              <div className="pt-2">
                <div className="font-display font-700 text-lg text-ink">{t("products.viewAllTitle")}</div>
                <div className="font-mono text-xs text-steel">{t("products.viewAllSub")}</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 bg-accent group-hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-full transition-colors shrink-0">
              {t("products.viewAllBtn")}
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

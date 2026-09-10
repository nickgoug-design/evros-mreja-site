import { useEffect, useRef } from "react";
import "./VideoScrubHero.css";
import { asset } from "../utils/asset.js";

/**
 * VideoScrubHero
 * ---------------
 * 900vh wrapper + sticky video. Το scroll μέσα σε αυτό οδηγεί ένα progress 0..1,
 * lerp-αρισμένο (0.15) μέσω requestAnimationFrame, γραμμένο ως CSS custom property
 * --p στο wrapper. Κάθε "beat" διαβάζει το --p μέσω calc() στο CSS (VideoScrubHero.css) —
 * καμία re-render του React ανά frame, καμία λογική animation μέσα στο JSX.
 *
 * Το βίντεο πρέπει να υπάρχει στο public/hero.mp4 (βλ. README/οδηγίες).
 */
export default function VideoScrubHero() {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    video.muted = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // Καμία scroll-scrub λογική — απλά παίζει κανονικά, loop.
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    let duration = 0;
    let target = 0;
    let current = 0;
    let lastSetTime = -1;
    let rafId;

    // --- Palette sampling: τραβάει ένα frame σε κρυφό canvas, βγάζει μέσο χρώμα ---
    function samplePaletteFromVideo() {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 48;
        canvas.height = 27;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        const onceReady = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          let r = 0, g = 0, b = 0, n = 0;
          let rL = 0, gL = 0, bL = 0, nL = 0;
          for (let i = 0; i < data.length; i += 4) {
            const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (lum > 120) { rL += data[i]; gL += data[i + 1]; bL += data[i + 2]; nL++; }
            else { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
          }
          if (n) {
            document.documentElement.style.setProperty(
              "--vsh-accent-2",
              `rgb(${Math.round(r / n)},${Math.round(g / n)},${Math.round(b / n)})`
            );
          }
          if (nL) {
            document.documentElement.style.setProperty(
              "--vsh-accent",
              `rgb(${Math.round(rL / nL)},${Math.round(gL / nL)},${Math.round(bL / nL)})`
            );
          }
        };
        if (video.readyState >= 2) onceReady();
        else video.addEventListener("loadeddata", onceReady, { once: true });
      } catch {
        // Πιθανό CORS θέμα -> αγνόησέ το, κρατάμε τα fallback χρώματα του CSS
      }
    }

    function onLoadedMetadata() {
      duration = video.duration || 0;
      samplePaletteFromVideo();
    }

    function computeTarget() {
      const total = wrapper.offsetHeight - window.innerHeight;
      if (total <= 0) return 0;
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;
      return Math.min(1, Math.max(0, scrolled / total));
    }

    function onScroll() {
      target = computeTarget();
    }

    function loop() {
      current += (target - current) * 0.15;
      if (Math.abs(target - current) < 0.0005) current = target;

      wrapper.style.setProperty("--p", current.toFixed(4));

      if (duration > 0 && !video.seeking) {
        const t = current * duration;
        if (Math.abs(t - lastSetTime) > 1 / 30) {
          video.currentTime = t;
          lastSetTime = t;
        }
      }
      rafId = requestAnimationFrame(loop);
    }

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    rafId = requestAnimationFrame(loop);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="vsh-wrapper" ref={wrapperRef}>
      <div className="vsh-stage">
        <video ref={videoRef} className="vsh-video" src={asset("/hero.mp4")} muted playsInline preload="auto" />
        <div className="vsh-shade" />

        <svg className="vsh-grain" xmlns="http://www.w3.org/2000/svg">
          <filter id="vshGrainFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.9 0 0 0 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#vshGrainFilter)" />
        </svg>

        {/* Title card — φεύγει στο πρώτο 5% του scroll */}
        <div className="vsh-beat vsh-title font-display" style={{ "--center": 0.02 }}>
          <div className="vsh-eyebrow font-mono">Από το 1976</div>
          <h1>
            Συρματουργία
            <br />
            Έβρου
          </h1>
        </div>

        {/* Beat 1 — LINE */}
        <div className="vsh-beat vsh-line font-display" style={{ "--center": 0.10 }}>
          <div className="vsh-rule" />
          <p>Σύρμα που κρατάει.</p>
        </div>

        {/* Beat 2 — BIG NUMBER */}
        <div className="vsh-beat vsh-number font-display" style={{ "--center": 0.22 }}>
          <div className="vsh-num">48+</div>
          <div className="vsh-label font-mono">Χρόνια εμπειρίας</div>
        </div>

        {/* Beat 3 — SPEC LIST */}
        <div className="vsh-beat vsh-spec font-mono" style={{ "--center": 0.34 }}>
          <ul>
            <li><span className="k">Πάχος σύρματος</span><span className="v">4–6mm</span></li>
            <li><span className="k">Γαλβάνισμα</span><span className="v">Θερμό, εν θερμώ</span></li>
            <li><span className="k">Άνοιγμα ματιού</span><span className="v">50×50mm</span></li>
          </ul>
        </div>

        {/* Beat 4 — PARAGRAPH */}
        <div className="vsh-beat vsh-paragraph font-display" style={{ "--center": 0.46 }}>
          <p>Από μικρή βιοτεχνία σύρματος, στην ηγετική θέση της βιομηχανίας τελών δικτύων στην Ελλάδα.</p>
        </div>

        {/* Beat 5 — DIAGONAL TAG */}
        <div className="vsh-beat vsh-tag" style={{ "--center": 0.58 }}>
          <div className="tag-card vsh-tagcard">
            <div className="pt-2 small font-mono">Έβρος, Ελλάδα</div>
            <div className="brand font-display">NORMA A.E.</div>
          </div>
        </div>

        {/* Beat 6 — SPLIT */}
        <div className="vsh-beat vsh-split" style={{ "--center": 0.68 }}>
          <div className="row">
            <span className="k font-mono">Παραγωγή</span>
            <span className="v font-display">5.000 τ.μ.</span>
          </div>
        </div>

        {/* Beat 7 — CODE BLOCK */}
        <div className="vsh-beat vsh-code font-mono" style={{ "--center": 0.78 }}>
          <div className="rows">
            <div><span className="code">01</span><span>Συρματόπλεγμα</span></div>
            <div><span className="code">02</span><span>NORMA Panel</span></div>
            <div><span className="code">03</span><span>Σύρματα &amp; Αγκαθωτά</span></div>
            <div><span className="code">04</span><span>Πονταριστά</span></div>
          </div>
        </div>

        {/* Beat 8 — STATEMENT */}
        <div className="vsh-beat vsh-statement font-display" style={{ "--center": 0.88 }}>
          <p>Το σύρμα που <em>δένει</em> &amp; κρατάει.</p>
        </div>

        {/* Beat 9 — END CARD */}
        <div className="vsh-beat vsh-end font-display" style={{ "--center": 0.965 }}>
          <h2>Ζητήστε προσφορά σήμερα.</h2>
          <a href="#contact">Επικοινωνία →</a>
        </div>
      </div>
    </div>
  );
}

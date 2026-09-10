import { useEffect, useState } from "react";
import useInView from "../hooks/useInView.js";

/**
 * AnimatedCounter
 * Δέχεται ένα αριθμό ή string (π.χ. "45+", "100%", "1976") και,
 * αν περιέχει αριθμό, τον "μετράει" από το 0 μέχρι την τελική τιμή
 * τη στιγμή που το στοιχείο μπαίνει στην οθόνη. Ό,τι δεν είναι
 * αριθμός (π.χ. "+", "%") παραμένει σταθερό στο τέλος του κειμένου.
 */
export default function AnimatedCounter({ value, duration = 1200 }) {
  const [ref, isInView] = useInView({ threshold: 0.4 });
  const [display, setDisplay] = useState("0");

  // Ξεχωρίζουμε το αριθμητικό κομμάτι (π.χ. "5.000" από "5.000 τ.μ.").
  // Η τελεία εδώ είναι διαχωριστικό χιλιάδων (ελληνική μορφή), όχι δεκαδικό —
  // γι' αυτό την αφαιρούμε πριν κάνουμε parseFloat.
  const numericMatch = value.match(/[\d.]+/);
  const rawNumeric = numericMatch ? numericMatch[0] : null;
  const numericTarget = rawNumeric ? parseFloat(rawNumeric.replace(/\./g, "")) : null;
  const suffix = numericMatch ? value.slice(numericMatch.index + numericMatch[0].length) : "";
  const prefix = numericMatch ? value.slice(0, numericMatch.index) : "";
  // Ξαναβάζουμε τελείες χιλιάδων στην τελική εμφάνιση όταν ο αριθμός είναι μεγάλος
  const format = (n) => (n >= 1000 ? n.toLocaleString("el-GR") : String(n));

  useEffect(() => {
    if (!isInView || numericTarget === null) {
      if (numericTarget === null) setDisplay(value);
      return;
    }

    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericTarget);
      setDisplay(`${prefix}${format(current)}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    }
    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return <span ref={ref}>{display}</span>;
}

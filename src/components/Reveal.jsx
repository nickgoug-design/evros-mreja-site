import useInView from "../hooks/useInView.js";

/**
 * Reveal
 * Wrapper που κάνει fade-up + slight scale το περιεχόμενό του
 * τη στιγμή που μπαίνει στο viewport. Χρησιμοποίησέ το γύρω από
 * ό,τι θες να "ζωντανέψει" καθώς ο χρήστης κάνει scroll.
 *
 * delay: προαιρετική καθυστέρηση σε ms, χρήσιμο για stagger effect
 *        (π.χ. cards που εμφανίζονται ένα-ένα).
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

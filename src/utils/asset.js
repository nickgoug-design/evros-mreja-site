/**
 * asset(path)
 * -----------
 * Προσθέτει σωστά το base path του Vite (π.χ. "/norma-site/") μπροστά από
 * ένα static asset path (εικόνες/βίντεο μέσα στο public/).
 *
 * Γιατί χρειάζεται: το Vite ενημερώνει αυτόματα με το base path ΜΟΝΟ τα
 * δικά του JS/CSS bundles -- ΟΧΙ τα hardcoded strings μέσα στον κώδικά μας
 * (π.χ. src="/images/product-01.jpg"). Χωρίς αυτό το helper, τέτοια paths
 * θα έδειχναν στη ρίζα του domain αντί στο σωστό subpath όταν κάνουμε
 * deploy σε GitHub Pages (π.χ. username.github.io/norma-site/).
 *
 * Χρήση: asset("/images/product-01.jpg") -> "/norma-site/images/product-01.jpg"
 */
export function asset(path) {
  const base = import.meta.env.BASE_URL || "/";
  return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}

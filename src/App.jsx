import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Home from "./pages/Home.jsx";
import ProductCatalogue from "./pages/ProductCatalogue.jsx";

// Χειρίζεται anchor links σαν "/#contact": πρώτα αλλάζει σελίδα (React Router),
// μετά κάνει scroll στο σωστό section μόλις προλάβει να φορτώσει το DOM.
function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductCatalogue />} />
      </Routes>
      <Footer />
      <BackToTop />
    </div>
  );
}

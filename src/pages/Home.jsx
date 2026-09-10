import VideoHero from "../components/VideoHero.jsx";
import About from "../components/About.jsx";
import Products from "../components/Products.jsx";
import ContactForm from "../components/ContactForm.jsx";

export default function Home() {
  return (
    <>
      <VideoHero />
      <About />
      <Products />
      <ContactForm />
    </>
  );
}
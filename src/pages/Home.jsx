import VideoHero from "../components/VideoHero.jsx";
import About from "../components/About.jsx";
import Vision from "../components/Vision.jsx";
import Products from "../components/Products.jsx";
import ContactForm from "../components/ContactForm.jsx";

export default function Home() {
  return (
    <>
      <VideoHero />
      <About />
      <Vision />
      <Products />
      <ContactForm />
    </>
  );
}
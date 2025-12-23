import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import Schedule from "./components/Schedule.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  return (<div className="min-h-screen bg-sky-200 text-white overflow-hidden">
    <Navbar />
    <Hero />
    <Features />
    <Schedule />
    <Testimonials />
    <Footer />

  </div>
  );
}

export default App;

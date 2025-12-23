import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";
import Volunteers from "./components/Volunteers.jsx";


function App() {
  return (<div className="min-h-screen bg-sky-200 text-white overflow-hidden">
    <Navbar />
    <Hero />
    <About />
    <Volunteers />
    <Testimonials />
    <Footer />

  </div>
  );
}

export default App;

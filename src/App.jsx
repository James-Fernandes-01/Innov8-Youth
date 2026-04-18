import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";
import Volunteers from "./components/Volunteers.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/login.jsx";
import LogHours from "./components/LogHours.jsx";
import TrackHours from "./components/TrackHours.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Volunteers />
      <Testimonials />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="min-h-screen bg-sky-300 text-white overflow-hidden"><Home /></div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/log-hours" element={<LogHours />} />
      <Route path="/track-hours" element={<TrackHours />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;

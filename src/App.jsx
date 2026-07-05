import React, { useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/hero.jsx";
import Features from "./components/feature.jsx";
import Events from "./components/events.jsx";
import Gallery from "./components/gallery.jsx";
import LocationMap from "./components/locationMap.jsx";
import Footer from "./components/footer.jsx";
import Booking from "./components/booking.jsx";
import LookbookPage from "./components/lookbookpage.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Home = () => (
  <>
    <Hero />
    <Features />
    <Events />
    <Gallery />
    <LocationMap />
  </>
)
export default function App(){
  return(
    <Router>
      <ScrollToTop />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/gallery" element={<LookbookPage />} />
      </Routes>
      <Footer/>
    </Router>
  )
}
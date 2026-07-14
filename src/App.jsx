import React, { useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/hero.jsx";
import Features from "./components/feature.jsx";
import Events from "./components/events.jsx";
import LocationMap from "./components/locationMap.jsx";
import Footer from "./components/footer.jsx";
import Booking from "./components/booking.jsx";
import Gallery from "./components/gallery.jsx";
import LookbookPage from "./components/lookbookpage.jsx";
import Dashboard from "./components/dashboard.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper for standard customer-facing pages that NEED the header/footer
const CustomerLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// Homepage combination
const Home = () => (
  <>
    <Hero />
    <Features />
    <Gallery />
    <Events />
    <LocationMap />
  </>
);

export default function App(){
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* --- Public Customer Facing Routes (Wrapped with Nav/Footer) --- */}
        <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
        <Route path="/booking" element={<CustomerLayout><Booking /></CustomerLayout>} />
        <Route path="/gallery" element={<CustomerLayout><LookbookPage /></CustomerLayout>} />

        {/* --- Isolated Staff Dashboard Route (Zero header/footer distraction) --- */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
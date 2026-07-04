import React from "react";
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/hero.jsx";
import Features from "./components/feature.jsx";
import Events from "./components/events.jsx";

export default function App(){
  return(
    <>
      <Navbar/>
      <Hero/>
      <Features/>
      <Events/>
    </>
  )
}
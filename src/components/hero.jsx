import React, { useState, useEffect } from "react";
import "./hero.css";

export default function Hero() {
    // 1. Array of images representing different sections of Reboot Luxury Place
    const carouselImages = [
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000", // Club energy
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000", // Premium Bar/Mixology
        "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000"  /* VIP Lounge vibe */
    ];

    // 2. State tracker for the currently visible image index
    const [currentIndex, setCurrentIndex] = useState(0);

    // 3. Effect hook to auto-advance the slider every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5000ms = 5 seconds

        return () => clearInterval(timer); // Clean up timer on unmount
    }, [carouselImages.length]);

    return (
        <section className="hero-section" id="home">
            {/* CAROUSEL BACKGROUND TRACKER */}
            {carouselImages.map((image, index) => (
                <div
                    key={index}
                    className={`hero-bg-slide ${index === currentIndex ? "active" : ""}`}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
            ))}

            {/* Dark Overlay Mask */}
            <div className="hero-overlay"></div>

            {/* Static Content Overlay */}
            <div className="hero-content">
                <span className="hero-badge">AWKA'S PREMIER DESTINATION</span>
                <h1 className="hero-title">
                    ELEVATE YOUR <br />
                    <span className="hero-title-accent">NIGHTLIFE</span>
                </h1>
                
                <p className="hero-subtitle">
                    Experience premium mixology, exclusive VIP lounges, and high-energy entertainment in the heart of Awka.
                </p>

                <div className="hero-cta-group">
                    <a href="#services" className="btn-primary-hero">
                        EXPLORE THE VIBE
                    </a>
                    <a href="#gallery" className="btn-secondary-hero">
                        VIEW GALLERY
                    </a>
                </div>
            </div>
            <div className="hero-scroll-indicator">
                <div className="scroll-line"></div>
            </div>
        </section>
    );
}
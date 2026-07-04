import React from 'react';
import './feature.css';

export default function Features() {
  // Updated experiences based on the venue layout pillars
  const experiences = [
    {
      icon: "🪩",
      title: "The Indoor Club",
      description: "Soundproofed, high-energy nightclub space with resident DJs and VIP seating tables."
    },
    {
      icon: "🍹",
      title: "The Outdoor Bar & Lounge",
      description: "Sprawling open-air seating area for evening relaxation, social drinking, and community mixers."
    },
    {
      icon: "🎱",
      title: "The Sports & Recreation Hub",
      description: "Home to 4 top-tier, excellent billiard/pool boards hosting some of Awka's best casual and competitive pool players."
    },
    {
      icon: "🏊‍♂️",
      title: "The Pool Side",
      description: "Premium poolside atmosphere featuring live weekend events, cocktail bars, and outdoor parties."
    }
  ];

  return (
    <section className="features-section" id="services">
      <div className="features-container">
        
        {/* Section Heading */}
        <div className="features-header">
          <span className="features-subtitle">THE REBOOT EXPERIENCE</span>
          <h2 className="features-title">DISCOVER THE VIBE</h2>
          <div className="features-divider"></div>
        </div>

        {/* Dynamic Grid Cards */}
        <div className="features-grid">
          {experiences.map((exp, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{exp.icon}</div>
              <h3 className="feature-card-title">{exp.title}</h3>
              <p className="feature-card-desc">{exp.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
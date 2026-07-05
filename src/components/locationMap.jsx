import React from 'react';
import './locationMap.css';

export default function LocationMap() {
  const handleOpenGoogleMaps = () => {
    // Generates an external direct route lookup to Awka's central coordinates
    const awkaCoordinates = "6.2105,7.0722";
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${awkaCoordinates}`, '_blank');
  };

  return (
    <section className="map-section" id="location">
      <div className="map-container">
        
        {/* Section Title */}
        <div className="map-header">
          <span className="map-subtitle">EXPLORE THE DESTINATION</span>
          <h2 className="map-title">FIND REBOOT LUXURY</h2>
          <div className="map-divider"></div>
        </div>

        <div className="map-wrapper-grid">
          
          {/* Left Column: Premium Directives Guide */}
          <div className="map-info-card">
            <div className="info-block">
              <span className="info-label">THE VENUE ADDRESS</span>
              <p className="info-text">Plot 12, Premium Elite Strip, Institutional Layout, Awka, Anambra State, Nigeria.</p>
            </div>

            <div className="info-block">
              <span className="info-label">PROMINENT LANDMARKS</span>
              <p className="info-text">Conveniently situated 3 minutes from the main expressway intersection, right next to the Elite Corporate Hub tower.</p>
            </div>

            <div className="info-block">
              <span className="info-label">VALET & PARKING ASSISTANCE</span>
              <p className="info-text">Complimentary VIP secure valet parking is fully active for all club members and reservation holders at the frontline gates.</p>
            </div>

            <button className="btn-get-directions" onClick={handleOpenGoogleMaps}>
              LAUNCH LIVE GPS NAVIGATION →
            </button>
          </div>

          {/* Right Column: Embedded Dark-Themed Map Canvas */}
          <div className="map-canvas-container">
            <iframe 
              title="Reboot Luxury Awka Map"
              src="https://maps.google.com/maps?q=Awka,%20Anambra,%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="google-map-iframe"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
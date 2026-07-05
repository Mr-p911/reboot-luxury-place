import React, { useState } from 'react';
import './booking.css'; // Make sure capitalization matches your filename exactly

export default function Booking() {
  // Booking Form States
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '',
    zone: 'Standard Lounge',
    specialEventId: ''
  });

  // Lightbox State for Poster viewing
  const [lightboxImg, setLightboxImg] = useState(null);

  // Dynamic Month Helper: Pulls the current system month in uppercase (e.g., JULY)
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' }).toUpperCase();

  // Mock Expanded Events Data for the Lookbook Catalog
  const monthlyEvents = [
    {
      id: 'e1',
      title: 'VINTAGE GOLD NIGHT',
      date: 'Friday, July 10',
      description: 'An elite throwback experience featuring rare rhythm matrices, premium signature mixes, and a complimentary gold-tier welcome cocktail for early entries.',
      djs: ['DJ KAPPA', 'MC FLASH'],
      poster: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      tag: 'MOST POPULAR'
    },
    {
      id: 'e2',
      title: 'NEON MATRIX ECLIPSE',
      date: 'Friday, July 17',
      description: 'Step into the future of nightlife. High-intensity laser systems paired with heavy synth-wave beats and immersive structural audio setups.',
      djs: ['DJ HYPER', 'HYMAN'],
      poster: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      tag: 'HIGH ENERGY'
    },
    {
      id: 'e3',
      title: 'MIDNIGHT OASIS POOLPARTY',
      date: 'Saturday, July 25',
      description: 'Premium poolside acoustics under the stars. Special light displays, open-air cabanas, and custom mixology bars running all night long.',
      djs: ['DJ LIQUID', 'MC BREEZE'],
      poster: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
      tag: 'POOL SIDE'
    }
  ];

  // Autofill form when user clicks a specific event poster button
  const selectEventForBooking = (event) => {
    setFormData({
      ...formData,
      zone: 'VIP Club Arena',
      specialEventId: event.title
    });
    // Smoothly scroll down to the booking form input field block
    document.getElementById('booking-form-anchor').scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reservation Request Submitted for: ${formData.name} - ${formData.specialEventId || formData.zone}`);
  };

  return (
    <section className="booking-section" id="booking">
      <div className="booking-container">
        
        {/* --- FIRST LAYER: SHOWCASE CATALOG WITH DYNAMIC GOLD MONTH HEADER --- */}
        <div className="showcase-wrapper">
          <div className="showcase-header">
            <span className="showcase-subtitle">THE FULL LOOKBOOK</span>
            <h2 className="showcase-title">
              <span className="dynamic-month-gold">{currentMonthName}</span> SPECIAL EXPERIENCES
            </h2>
            <p className="showcase-desc">Explore exclusive curated lineups for this month. Secure your table allocation ahead of time to guarantee entry.</p>
          </div>

          <div className="events-extended-list">
            {monthlyEvents.map((event) => (
              <div key={event.id} className="event-extended-card">
                
                {/* Left side: Poster Box (Clicking this opens the Lightbox modal) */}
                <div 
                  className="event-poster-box" 
                  onClick={() => setLightboxImg(event.poster)}
                  title="Click to zoom poster"
                  style={{ cursor: 'zoom-in' }}
                >
                  <img src={event.poster} alt={event.title} />
                  <span className="event-badge-tag">{event.tag}</span>
                  <div className="poster-zoom-overlay"><span>🔍 VIEW POSTER</span></div>
                </div>

                {/* Right side: Detailed Information Breakdown */}
                <div className="event-details-box">
                  <div className="event-meta-top">
                    <span className="event-date-stamp">📆 {event.date}</span>
                    <h3 className="event-name-heading">{event.title}</h3>
                  </div>

                  <p className="event-description-text">{event.description}</p>

                  <div className="djs-lineup-row">
                    <span className="lineup-label">HEADLINING PERFORMERS:</span>
                    <div className="dj-badges">
                      {event.djs.map((dj, idx) => (
                        <span key={idx} className="dj-badge">🔥 {dj}</span>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="btn-book-this-night"
                    onClick={() => selectEventForBooking(event)}
                  >
                    BOOK FOR THIS NIGHT
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* --- SECOND LAYER: MASTER RESERVATION CONCIERGE FORM --- */}
        <div className="booking-form-wrapper" id="booking-form-anchor">
          <div className="form-header">
            <span className="form-subtitle">SECURE ACCESS</span>
            <h2 className="form-title">RESERVE A SANCTUARY</h2>
            <div className="form-divider"></div>
          </div>

          <form onSubmit={handleSubmit} className="luxury-form">
            <div className="form-grid">
              <div className="input-group">
                <label>FULL NAME</label>
                <input type="text" name="name" required placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
              </div>
              
              <div className="input-group">
                <label>PHONE NUMBER</label>
                <input type="tel" name="phone" required placeholder="+234 ..." value={formData.phone} onChange={handleInputChange} />
              </div>

              <div className="input-group">
                <label>GUEST COUNT</label>
                <select name="guests" value={formData.guests} onChange={handleInputChange}>
                  {[1,2,3,4,5,6,7,8,10].map(n => <option key={n} value={n}>{n} Guests</option>)}
                  <option value="12+">VIP Group (12+)</option>
                </select>
              </div>

              <div className="input-group">
                <label>CHOOSE ZONE</label>
                <select name="zone" value={formData.zone} onChange={handleInputChange}>
                  <option>Standard Lounge</option>
                  <option>VIP Club Arena</option>
                  <option>Premium Poolside Cabana</option>
                  <option>Billiards Sports Hub</option>
                </select>
              </div>

              <div className="input-group">
                <label>DATE</label>
                <input type="date" name="date" required value={formData.date} onChange={handleInputChange} />
              </div>

              <div className="input-group">
                <label>ARRIVAL TIME</label>
                <input type="time" name="time" required value={formData.time} onChange={handleInputChange} />
              </div>
            </div>

            {formData.specialEventId && (
              <div className="selected-event-badge">
                Selected Event Tier: <strong>{formData.specialEventId}</strong>
                <button type="button" className="clear-event" onClick={() => setFormData({...formData, specialEventId: ''})}>✕ Clear</button>
              </div>
            )}

            <button type="submit" className="btn-submit-booking">CONFIRM LUXURY RESERVATION</button>
          </form>
        </div>

      </div>

      {/* --- POSTER LIGHTBOX OVERLAY VIEW MODAL --- */}
      {lightboxImg && (
        <div className="poster-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="close-lightbox">✕</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg} alt="Expanded Lookbook Event Poster" />
          </div>
        </div>
      )}
    </section>
  );
}
import React, { useState, useEffect } from 'react';
import './booking.css'; // Make sure capitalization matches your filename exactly

export default function Booking() {
  // --- DYNAMIC DATA STATE CORE ---
  const [monthlyEvents, setMonthlyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // --- GET LIVE DATA FROM THE BACKEND ---
  useEffect(() => {
    const fetchLiveEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        if (response.ok) {
          setMonthlyEvents(data);
        }
      } catch (err) {
        console.error("Failed to pool active operational events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Select event action handler
  const handleSelectEvent = (eventId, eventDateString) => {
    const normalizedDate = eventDateString ? eventDateString.split('T')[0] : '';
    setFormData({
      ...formData,
      specialEventId: eventId,
      date: normalizedDate
    });

    document.getElementById('reservation-form-block')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Reservation Request Submitted Successfully!\nName: ${formData.name}\nDate: ${formData.date}`);
  };

  if (loading) {
    return (
      <div style={{ background: 'var(--reboot-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        LOADING RESERVATION CATALOG...
      </div>
    );
  }

  return (
    <section className="booking-section" id="booking">
      <div className="booking-container">

        {/* LOOKBOOK EVENT MATRIX WRAPPER */}
        <div className="showcase-wrapper">
          <div className="showcase-header">
            <span className="showcase-subtitle">REBOOT SCHEDULE MATRIX</span>
            <h2 className="showcase-title">
              <span className="dynamic-month-gold">{currentMonthName}</span> SPECIAL EXPERIENCES
            </h2>
            <p className="showcase-desc">Explore exclusive curated lineups for this month. Secure your table allocation ahead of time to guarantee entry.</p>
          </div>
          {monthlyEvents.length > 0 ? (
            <div className="events-extended-list">
              {monthlyEvents.map((ev) => {
                const structuredDate = new Date(ev.date).toLocaleDateString('en-US', {
                  weekday: 'long', month: 'short', day: 'numeric'
                });

                return (
                  <div key={ev._id} className="event-extended-card">
                    <div className="event-poster-box" onClick={() => setLightboxImg(ev.flyerUrl)}>
                      <img src={ev.flyerUrl} alt={ev.title} />
                      <div className="poster-zoom-overlay"><span>🔍 VIEW POSTER</span></div>
                    </div>

                    <div className="event-details-box">
                      <div>
                        <span className="event-date-stamp">📆{structuredDate.toUpperCase()}</span>
                        <h3 className="event-name-heading">{ev.title}</h3>
                      </div>

                      <p className="event-discription-text">{ev.description}</p>
                      <div className="card-pricing-preview-list">
                        {ev.ticketTiers.map((tier, tIdx) => (
                          <span key={tIdx} className="preview-tier-pill">
                            <strong>{tier.tierName}:</strong> ₦{Number(tier.price).toLocaleString()}
                          </span>
                        ))}
                      </div>
                      {ev.performers && (
                        <div className="djs-lineup-row">
                          <span className="lineup-label">FEATURING:</span>
                          <span className="dj-badge">{ev.performers}</span>
                        </div>
                      )}


                      <button
                        type="button"
                        className={`btn-book-this-night ${formData.specialEventId === ev._id ? 'selected' : ''}`}
                        onClick={() => handleSelectEvent(ev._id, ev.date)}
                      >
                        {formData.specialEventId === ev._id ? '✓ SELECTED' : 'BOOK THIS EVENT'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              <p>No active events found inside the catalog ledger window.</p>
            </div>
          )}
        </div>

        {/* RESERVATION SCHEDULER BLOCK FORM */}
        <div id="reservation-form-block" className="booking-form-wrapper">
          <div className="form-header">
            <span className="form-subtitle">ONLINE VIP TABLE PORTAL</span>
            <h2 className="form-title">SECURE ENTRY RESERVATION</h2>
            <div className="form-divider"></div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <label>FULL NAME</label>
                <input type="text" name="name" required placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
              </div>

              <div className="input-group">
                <label>PHONE NUMBER</label>
                <input type="tel" name="phone" required placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange} />
              </div>

              <div className="input-group">
                <label>GUEST COUNT</label>
                <select name="guests" value={formData.guests} onChange={handleInputChange}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} Guests</option>)}
                  <option value="12+">VIP Group (12+)</option>
                </select>
              </div>

              <div className="input-group">
                <label>VIP CLUB ZONE</label>
                <select name="zone" value={formData.zone} onChange={handleInputChange}>
                  <option value="Standard Lounge">Standard Lounge Area</option>
                  <option value="VIP Dancefloor Ring">VIP Dancefloor Ring</option>
                  <option value="Main Stage Suite">Main Stage Backstage Suite</option>
                  <option value="Billiards Sports Hub">Billiards Sports Hub</option>
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
                Selected Event Tier Hook Activated
                <button type="button" className="clear-event" onClick={() => setFormData({ ...formData, specialEventId: '' })}>✕ Remove Link</button>
              </div>
            )}

            <button type="submit" className="btn-submit-booking">CONFIRM LUXURY RESERVATION</button>
          </form>
        </div>

      </div>

      {/* --- FLOATING LIGHTBOX ENLARGEMENT CAPTION VIEW --- */}
      {lightboxImg && (
        <div className="poster-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="close-lightbox" onClick={() => setLightboxImg(null)}>✕</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg} alt="Expanded Flyer View" />
          </div>
        </div>
      )}
    </section>
  );
}
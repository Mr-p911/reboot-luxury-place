import React, { useState } from 'react';
import './events.css';

export default function Events() {
  // Static array for the main weekly overview rows
  const weeklyEvents = [
    {
      day: "FRIDAY",
      time: "8:00 PM - LATE",
      title: "Vibe Check Fridays",
      tagline: "High-Energy Club Night",
      accent: "var(--reboot-purple)"
    },
    {
      day: "SATURDAY",
      time: "4:00 PM - 10:00 PM",
      title: "Splash & Sip",
      tagline: "Premium Poolside Socials",
      accent: "var(--reboot-gold)"
    },
    {
      day: "SUNDAY",
      time: "6:00 PM - MIDNIGHT",
      title: "Chilled & Cue",
      tagline: "Billiards, Mixology & Live Beats",
      accent: "#10B981"
    }
  ];

  // 1. UI State to control opening/closing the modal layout
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Mock Database State (This array will be populated by your database API later)
  const [monthlyEvents] = useState([
    { id: 1, date: "July 10", name: "Champagne Showers VIP Night" },
    { id: 2, date: "July 11", name: "Celebrity DJ Guest Set" },
    { id: 3, date: "July 17", name: "Afrobeats All-Night Mixer" },
    { id: 4, date: "July 24", name: "Premium Billiards Championship" },
    { id: 5, date: "July 31", name: "Neon Glow Pool Party Finale" }
  ]);

  return (
    <section className="events-section" id="events">
      <div className="events-container">
        
        {/* Section Header */}
        <div className="events-header">
          <span className="events-subtitle">WEEKLY LINEUP</span>
          <h2 className="events-title">THE NIGHTS TO REMEMBER</h2>
          <div className="events-divider"></div>
        </div>

        {/* Schedule Grid Rows */}
        <div className="events-grid">
          {weeklyEvents.map((evt, index) => (
            <div key={index} className="event-card">
              <div className="event-day-badge" style={{ backgroundColor: evt.accent }}>
                {evt.day}
              </div>
              <div className="event-info">
                <span className="event-time">{evt.time}</span>
                <h3 className="event-card-title">{evt.title}</h3>
                <p className="event-card-tagline">{evt.tagline}</p>
              </div>
              <div className="event-action">
                <a href="#booking" className="event-link">RESERVE TABLE →</a>
              </div>
            </div>
          ))}
        </div>

        {/* 3. NEW FEATURE BUTTON: Triggers the Modal Box */}
        <div className="monthly-btn-container">
          <button className="btn-monthly-calendar" onClick={() => setIsModalOpen(true)}>
            VIEW ALL SPECIAL EVENTS
          </button>
        </div>

      </div>

    {/* --- PURE UI MODAL DIALOG --- */}
    {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
                <div>
                <h2>MONTHLY SPECIALS</h2>
                <p className="modal-desc">Exclusive theme nights and upcoming bookings</p>
                </div>
                <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            {/* Iterates dynamically through your mock database data */}
            <div className="modal-events-list">
                {monthlyEvents.map((item) => (
                <div key={item.id} className="modal-event-item">
                    <div className="modal-event-left">
                    <span className="modal-event-date">{item.date}</span>
                    <span className="modal-event-name">{item.name}</span>
                    </div>
                    {/* Added: Immediate table reservation path button */}
                    <a href="#booking" className="btn-modal-reserve" onClick={() => setIsModalOpen(false)}>
                    RESERVE TABLE
                    </a>
                </div>
                ))}
            </div>

            </div>
        </div>
      )}
    </section>
  );
}
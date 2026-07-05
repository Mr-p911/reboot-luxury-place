import React from 'react';
import { Link } from 'react-router-dom'; // 1. Imported Link component
import './events.css';

export default function Events() {
  // Keeping your exact original weekly overview rows database array intact
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

  return (
    <section className="events-section" id="events">
      <div className="events-container">
        
        {/* --- SECTION HEADER --- */}
        <div className="events-header">
          <span className="events-subtitle">WEEKLY LINEUP</span>
          <h2 className="events-title">THE MATRIX TIMETABLE</h2>
          <div className="events-divider"></div>
        </div>

        {/* --- WEEKLY TIMETABLE MATRIX GRID --- */}
        <div className="events-grid">
          {weeklyEvents.map((event, index) => (
            <div 
              key={index} 
              className="event-card"
              style={{ '--accent-hover': event.accent }}
            >
              {/* Day Badge */}
              <div className="event-day-badge" style={{ backgroundColor: event.accent }}>
                {event.day}
              </div>

              {/* Core Context Detail Info */}
              <div className="event-info">
                <span className="event-time">⏰ {event.time}</span>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-tagline">{event.tagline}</p>
              </div>

              {/* Individual reservation triggers directly route to /booking */}
              <div className="event-action">
                <Link to="/booking" className="event-link">
                  RESERVE TABLE <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM MASTER ACTIONS CONSOLE --- */}
        <div className="events-footer">
          {/* 2. Wrapped button in a Link to seamlessly navigate pages */}
          <Link to="/booking">
            <button className="btn-view-specials">
              VIEW ALL SPECIAL EVENTS
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
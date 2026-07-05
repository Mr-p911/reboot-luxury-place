import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer-section" id="location">
      <div className="footer-container">
        
        {/* Top Info Grid */}
        <div className="footer-grid" id="contact">
          
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <h3 className="footer-logo">REBOOT <span className="logo-accent">LUXURY</span></h3>
            <p className="footer-tagline">Awka’s premier nightlife destination. High-energy club matrices, premium poolside acoustics, and curated luxury experiences.</p>
            <div className="social-links">
              <a href="#instagram" className="social-icon">IG</a>
              <a href="#twitter" className="social-icon">X</a>
              <a href="#facebook" className="social-icon">FB</a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#events">Weekly Lineup</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>

          {/* Hours Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">OPERATING HOURS</h4>
            <ul className="footer-hours">
              <li><span>Friday (Club Night):</span> 8:00 PM - LATE</li>
              <li><span>Saturday (Poolside):</span> 4:00 PM - 10:00 PM</li>
              <li><span>Sunday (Lounge/Cue):</span> 6:00 PM - MIDNIGHT</li>
              <li><span>Mon - Thu (Lounge):</span> 4:00 PM - 11:00 PM</li>
            </ul>
          </div>

          {/* Destination / Contact Column */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">FIND US</h4>
            <p className="contact-detail">📍 Premium Elite Strip, Awka, Anambra State, Nigeria</p>
            <p className="contact-detail">📞 +234 (0) 800 REBOOT LX</p>
            <p className="contact-detail">✉️ reservations@rebootluxury.com</p>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} REBOOT LUXURY. All Rights Reserved.</p>
          <p className="dev-credit">Designed with Premium Intentions</p>
        </div>

      </div>
    </footer>
  );
}
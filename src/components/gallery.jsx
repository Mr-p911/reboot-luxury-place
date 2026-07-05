import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './gallery.css';

export default function Gallery() {
  // Lightbox Modal State for fullscreen preview on click
  const [lightboxItem, setLightboxItem] = useState(null);

  // Curated 6-item homepage snapshot array (Mix of landscape and portrait frames)
  const previewMedia = [
    {
      id: 1,
      type: 'image',
      category: 'THE CLUB',
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      title: 'Main Dancefloor & Sound Matrix'
    },
    {
      id: 2,
      type: 'image',
      category: 'POOLSIDE',
      url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
      title: 'Splash & Sip Day Beds'
    },
    {
      id: 3,
      type: 'image',
      category: 'VIP LOUNGE',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      title: 'Ultra-Premium Private Booths'
    },
    {
      id: 4,
      type: 'image',
      category: 'THE CLUB',
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      title: 'Mixology & Main Bar Arc'
    },
    {
      id: 5,
      type: 'image',
      category: 'POOLSIDE',
      url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
      title: 'Midnight Oasis Pool Deck'
    },
    {
      id: 6,
      type: 'image',
      category: 'VIP LOUNGE',
      url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
      title: 'Billiards Lounge Arena'
    }
  ];

  const handleViewFullGallery = () => {
    // For now, this lets us know the button works. 
    // Later we will link this to your separate sub-page route!
    alert("Routing to full lookbook page with staff creation dashboards...");
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        
        {/* Section Header */}
        <div className="gallery-header">
          <span className="gallery-subtitle">VISUAL SNAPSHOTS</span>
          <h2 className="gallery-title">INSIDE THE SANCTUARY</h2>
          <div className="gallery-divider"></div>
        </div>

        {/* Home View Media Grid */}
        <div className="gallery-grid">
          {previewMedia.map((item) => (
            <div 
              key={item.id} 
              className="gallery-card"
              onClick={() => setLightboxItem(item)}
            >
              <div className="gallery-media-wrapper">
                <img src={item.url} alt={item.title} className="gallery-img" loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-item-category">{item.category}</span>
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <span className="gallery-zoom-icon">VIEW FRAME 🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic CTA Button to access Full Lookbook Page */}
        <div className="gallery-action-container">
            <Link to="/gallery">
                <button className="btn-view-gallery">
                    EXPLORE FULL LOOKBOOK
                </button>
            </Link>
        </div>

      </div>

      {/* --- LIGHTBOX OVERLAY DIALOG --- */}
      {lightboxItem && (
        <div className="lightbox-backdrop" onClick={() => setLightboxItem(null)}>
          <button className="lightbox-close" onClick={() => setLightboxItem(null)}>✕</button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxItem.url} alt={lightboxItem.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <span>{lightboxItem.category}</span>
              <h3>{lightboxItem.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
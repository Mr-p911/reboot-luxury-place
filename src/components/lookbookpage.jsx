import React, { useState } from 'react';
import './lookbookpage.css'; // Completely separate CSS file!

export default function LookbookPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = ["ALL", "CLUB ARENA", "VIP LOUNGE", "BAR & MIXOLOGY"];

  // Expanded database for the separate subpage
  const lookbookDatabase = [
    { id: 1, category: "CLUB ARENA", title: "Main Floor Matrix", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80" },
    { id: 2, category: "BAR & MIXOLOGY", title: "Artisanal Cocktail Station", url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80" },
    { id: 3, category: "VIP LOUNGE", title: "Velvet Sanctuary Suites", url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80" },
    { id: 4, category: "CLUB ARENA", title: "Laser Array Showcase", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" },
    { id: 5, category: "VIP LOUNGE", title: "Obsidian Private Enclaves", url: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80" }
  ];

  const filteredItems = activeCategory === "ALL" 
    ? lookbookDatabase 
    : lookbookDatabase.filter(item => item.category === activeCategory);

  return (
    <section className="lookbook-page-section">
      <div className="lookbook-page-container">
        
        <div className="lookbook-page-header">
          <span className="lookbook-page-subtitle">THE VISUAL DIRECTORY</span>
          <h2 className="lookbook-page-title">THE FULL LOOKBOOK</h2>
          <div className="lookbook-page-divider"></div>
        </div>

        {/* Category Tabs */}
        <div className="lookbook-filter-tabs">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`lookbook-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="lookbook-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="lookbook-item" onClick={() => setLightboxItem(item)}>
              <div className="lookbook-media-wrapper">
                <img src={item.url} alt={item.title} className="lookbook-img" />
                <div className="lookbook-overlay">
                  <span className="lookbook-item-category">{item.category}</span>
                  <h3 className="lookbook-item-title">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {lightboxItem && (
        <div className="lookbook-lightbox-backdrop" onClick={() => setLightboxItem(null)}>
          <button className="lookbook-lightbox-close" onClick={() => setLightboxItem(null)}>✕</button>
          <div className="lookbook-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxItem.url} alt={lightboxItem.title} className="lookbook-lightbox-img" />
          </div>
        </div>
      )}
    </section>
  );
}
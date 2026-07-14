import React, { useState, useEffect } from 'react';
import './lookbookpage.css';

export default function LookbookPage() {
  const [lookbookItems, setLookbookItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const fetchLookbook = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/lookbook');
        const data = await response.json();
        if (response.ok) {
          setLookbookItems(data);
        }
      } catch (error) {
        console.error("Error communicating with lookbook backend database:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLookbook();
  }, []);

  // Dynamically compile active unique filter buttons from categories stored in database
  const generatedCategories = ['ALL', ...new Set(lookbookItems.map(item => item.category.toUpperCase()))];

  const filteredItems = activeCategory === 'ALL' 
    ? lookbookItems 
    : lookbookItems.filter(item => item.category.toUpperCase() === activeCategory);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', fontWeight: 'bold' }}>
        Loading Gallery...
      </div>
    );
  }

  return (
    <section className="lookbook-page-section">
      <div className="lookbook-page-container">
        
        <div className="lookbook-page-header">
          <span className="lookbook-page-subtitle">DIGITAL VISUAL LOOKBOOK</span>
          <h1 className="lookbook-page-title">EXPLORE THE VENUE</h1>
          <div className="lookbook-page-divider"></div>
        </div>

        {/* CONDITION 1: If there are lookbook items, render the full navigation and image gallery grid */}
        {lookbookItems.length > 0 ? (
          <>
            {/* TABS FILTER BUTTON BAR */}
            <div className="lookbook-filter-tabs-container">
              {generatedCategories.map((cat, index) => (
                <button
                  key={index}
                  className={`lookbook-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* LOOKBOOK IMAGES GRID STAGE */}
            <div className="lookbook-grid">
              {filteredItems.map((item) => (
                <div 
                  key={item._id} 
                  className="lookbook-item"
                  onClick={() => setLightboxImage(item.imageUrl)}
                >
                  <div className="lookbook-media-wrapper">
                    <img className="lookbook-img" src={item.imageUrl} alt={item.title} loading="lazy" />
                    <div className="lookbook-overlay">
                      <span className="lookbook-item-category">{item.category}</span>
                      <h3 className="lookbook-item-title">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* CONDITION 2: If no images exist anywhere, hide everything else and display clean fallback text */
          <div className="lookbook-empty-state-fallback">
            <span className="fallback-empty-icon">🖼️</span>
            <p className="no-items-message">
              No images available yet.
            </p>
            <p className="no-items-subtext">
              Our curators are currently updating the lookbook collections. Please check back soon!
            </p>
          </div>
        )}

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxImage && (
        <div className="lookbook-lightbox-backdrop" onClick={() => setLightboxImage(null)}>
          <button className="lookbook-lightbox-close" onClick={() => setLightboxImage(null)}>✕</button>
          <div className="lookbook-lightbox-content" onClick={(e) => e.stopPropagation()}>\
            <img src={lightboxImage} alt="Enlarged View" className="lookbook-lightbox-img" />
          </div>
        </div>
      )}
    </section>
  );
}
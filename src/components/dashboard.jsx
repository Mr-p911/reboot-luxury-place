import React, { useState, useEffect } from 'react';
import './dashboard.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('lookbook');

  // ==========================================
  // STATE STORAGE MATRIX
  // ==========================================

  // Lookbook States
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('CLUB ARENA');
  const [imageFile, setImageFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [allItems, setAllItems] = useState([]);

  // Phase 2: Event Management States
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventPerformers, setEventPerformers] = useState(''); // <-- Performers line state
  const [eventDescription, setEventDescription] = useState('');
  const [eventFlyerFile, setEventFlyerFile] = useState(null);
  const [eventStatusMessage, setEventStatusMessage] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  const [isPaid, setIsPaid] = useState(true);

  const [ticketTiers, setTicketTiers] = useState([
    { tierName: 'VIP', price: '10000', description: 'Standard VIP Access' },
    { tierName: 'PREMIUM (TABLE OF 6)', price: '20000', description: 'Table reservation with bottle service' }
  ]);

  // ==========================================
  // BACKEND REPOSITORY SYNC EFFECTS
  // ==========================================

  const refreshDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/lookbook');
      const data = await response.json();
      if (response.ok) {
        setAllItems(data);
        const dbCategories = data.map(item => item.category.trim().toUpperCase());
        const updatedCategoriesList = [...new Set(dbCategories)];
        setCategories(updatedCategoriesList);

        if (updatedCategoriesList.length > 0) {
          if (!updatedCategoriesList.includes(selectedCategory)) {
            setSelectedCategory(updatedCategoriesList[0]);
          }
        } else {
          setSelectedCategory('CLUB ARENA');
        }
      }
    } catch (error) {
      console.error("Error loading lookbook categories from server:", error);
    }
  };

  const refreshEventsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      if (response.ok) {
        setAllEvents(data);
      }
    } catch (error) {
      console.error("Error loading event listings from server:", error);
    }
  };

  useEffect(() => {
    if (activeTab === 'lookbook') {
      refreshDashboardData();
    } else if (activeTab === 'events') {
      refreshEventsData();
    }
  }, [activeTab]);

  // ==========================================
  // LOOKBOOK EVENT HANDLERS
  // ==========================================

  const handleCreateCategory = (e) => {
    e.preventDefault();
    const formattedCategory = newCategoryName.trim().toUpperCase();
    if (!formattedCategory) return;

    if (categories.includes(formattedCategory)) {
      alert('This category already exists!');
      return;
    }

    setCategories([...categories, formattedCategory]);
    setSelectedCategory(formattedCategory);
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!title || !imageFile) {
      setStatusMessage('⚠️ Please provide both a title and an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('category', selectedCategory);
    formData.append('image', imageFile);

    try {
      setStatusMessage('⏳ Uploading asset to database...');
      const response = await fetch('http://localhost:5000/api/lookbook', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setStatusMessage('✅ Lookbook asset pushed to live stream successfully!');
        setTitle('');
        setImageFile(null);
        refreshDashboardData();
        e.target.reset();
      } else {
        setStatusMessage(`❌ Upload failed: ${data.error}`);
      }
    } catch (error) {
      setStatusMessage('❌ Network error: Cannot connect to the backend server.');
    }
  };

  const handleDeleteItem = async (itemId, itemTitle) => {
    if (!window.confirm(`Are you sure you want to delete the image "${itemTitle}"?`)) return;
    try {
      const response = await fetch(`http://localhost:5000/api/lookbook/${itemId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        refreshDashboardData();
      } else {
        alert('Failed to delete target image asset.');
      }
    } catch (error) {
      alert('Network error connecting to backend deletion endpoint.');
    }
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    const linkedImagesCount = allItems.filter(
      item => item.category.toUpperCase() === categoryToDelete.toUpperCase()
    ).length;

    let confirmationPrompt = `Are you sure you want to delete the category "${categoryToDelete}"?`;
    if (linkedImagesCount > 0) {
      confirmationPrompt = `⚠️ WARNING: The category "${categoryToDelete}" currently contains ${linkedImagesCount} image(s).\n\nIf you proceed, EVERY image in this category will be PERMANENTLY cleared from the website and database!\n\nDo you want to proceed and wipe this category completely?`;
    }

    if (!window.confirm(confirmationPrompt)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/lookbook/category/${encodeURIComponent(categoryToDelete)}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        refreshDashboardData();
      } else {
        alert('Failed to remove targeted category group cascade.');
      }
    } catch (error) {
      alert('Error connecting to backend bulk deletion script.');
    }
  };

  // ==========================================
  // EVENT SCHEDULE MATRIX EVENT HANDLERS
  // ==========================================


  // ==========================================
  // TICKET TIER HANDLERS
  // ==========================================
  const handleAddTier = () => {
    setTicketTiers([...ticketTiers, { tierName: '', price: '', description: '' }]);
  };

  const handleRemoveTier = (indexToRemove) => {
    if (ticketTiers.length === 1) {
      alert("You must include at least one pricing category!");
      return;
    }
    setTicketTiers(ticketTiers.filter((_, idx) => idx !== indexToRemove));
  };

  const handleTierChange = (index, field, value) => {
    const updatedTiers = ticketTiers.map((tier, idx) => {
      if (idx === index) {
        return { ...tier, [field]: value };
      }
      return tier;
    });
    setTicketTiers(updatedTiers);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventDate || !eventDescription || !eventPerformers || !eventFlyerFile) {
      setEventStatusMessage('⚠️ All fields including the performers list and flyer are required.');
      return;
    }

    // NEW: Setup tiers based on Free vs Paid toggle switch status
    let formattedTiers = [];
    if (isPaid) {
      formattedTiers = ticketTiers
        .filter(t => t.tierName.trim() !== '' && t.price !== '')
        .map(t => ({
          tierName: t.tierName.trim().toUpperCase(),
          price: Number(t.price) || 0,
          description: t.description.trim()
        }));

      if (formattedTiers.length === 0) {
        setEventStatusMessage('⚠️ Please provide at least one valid ticket or table pricing category.');
        return;
      }
    } else {
      // If it's a free event, automatically generate a single default tier
      formattedTiers = [{ tierName: 'FREE ENTRY', price: 0, description: 'General public admission' }];
    }

    const formData = new FormData();
    formData.append('title', eventTitle.trim());
    formData.append('date', eventDate);
    formData.append('performers', eventPerformers.trim());
    formData.append('description', eventDescription.trim());
    formData.append('flyer', eventFlyerFile);
    formData.append('isPaid', isPaid); // <-- NEW: Append paid flag
    formData.append('ticketTiers', JSON.stringify(formattedTiers));

    try {
      setEventStatusMessage('⏳ Pushing event and pricing matrix to calendar stream...');
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (response.ok) {
        setEventStatusMessage('✅ Event scheduled and live on reservation portal!');
        setEventTitle('');
        setEventDate('');
        setEventPerformers('');
        setEventDescription('');
        setEventFlyerFile(null);
        setIsPaid(true); // Reset toggle to Paid
        setTicketTiers([
          { tierName: 'VIP', price: '10000', description: 'Standard VIP Access' },
          { tierName: 'PREMIUM (TABLE OF 6)', price: '20000', description: 'Table reservation with bottle service' }
        ]);
        refreshEventsData();
        e.target.reset();
      } else {
        setEventStatusMessage(`❌ Failed to post new event matrix: ${data.error}`);
      }
    } catch (error) {
      setEventStatusMessage('❌ Server connection failure.');
    }
  };
  const handleDeleteEvent = async (eventId, eventName) => {
    if (!window.confirm(`Are you sure you want to remove the scheduled event "${eventName}"?`)) return;
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        refreshEventsData();
      } else {
        alert('Failed to drop calendar event entry.');
      }
    } catch (error) {
      alert('Network failure connecting to event database removal handler.');
    }
  };

  // ==========================================
  // RENDER INTERFACE STAGE
  // ==========================================

  return (
    <div className="dash-modular-wrapper">
      <aside className="dash-sidebar">
        <div className="sidebar-brand">
          <h3>REBOOT <span>HQ</span></h3>
        </div>
        <nav className="sidebar-menu">
          <button
            className={`menu-tab-item ${activeTab === 'lookbook' ? 'active' : ''}`}
            onClick={() => setActiveTab('lookbook')}
          >
            🖼️ Lookbook Control
          </button>
          <button
            className={`menu-tab-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            📅 Event Schedules
          </button>
          <button
            className={`menu-tab-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            🗓️ Booking Services
          </button>
          <button
            className={`menu-tab-item ${activeTab === 'food' ? 'active' : ''}`}
            onClick={() => setActiveTab('food')}
          >
            🍔 Food Ordering
          </button>
        </nav>
      </aside>

      <main className="dash-content-window">
        {/* TAB 1: LOOKBOOK CONTROLLER PANEL */}
        {activeTab === 'lookbook' && (
          <div className="dash-full-pane-container">
            <div className="dash-clean-header">
              <div className="header-meta-left">
                <span>REBOOT DIGITAL ARCHIVE</span>
                <h2>LOOKBOOK MANAGEMENT ENGINE</h2>
              </div>

              <div className="category-control-action-block">
                {!isAddingCategory ? (
                  <button
                    type="button"
                    className="btn-trigger-category"
                    onClick={() => setIsAddingCategory(true)}
                  >
                    ➕ Create Category
                  </button>
                ) : (
                  <form onSubmit={handleCreateCategory} className="inline-category-creator-form">
                    <input
                      type="text"
                      placeholder="NEW CATEGORY NAME..."
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      autoFocus
                      required
                    />
                    <button type="submit" className="btn-save-cat">Save</button>
                    <button type="button" className="btn-cancel-cat" onClick={() => setIsAddingCategory(false)}>✕</button>
                  </form>
                )}
              </div>
            </div>

            <div className="dash-clean-divider"></div>

            <form className="dash-clean-form" onSubmit={handleUploadSubmit}>
              <div className="dash-form-row">
                <div className="dash-input-group">
                  <label>Image Display Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Midnight Matrix Lighting Grid"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="dash-input-group">
                  <label>Target Placement Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.length > 0 ? (
                      categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))
                    ) : (
                      <>
                        <option value="CLUB ARENA">CLUB ARENA</option>
                        <option value="VIP LOUNGE">VIP LOUNGE</option>
                        <option value="BAR & MIXOLOGY">BAR & MIXOLOGY</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="dash-input-group file-group">
                <label>Select Lookbook File</label>
                <div className="file-upload-dropzone">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                  />
                  <div className="dropzone-prompt-content">
                    <span className="dropzone-icon">📁</span>
                    <p className="file-upload-tip">Click to browse or drop files to upload</p>
                    <span className="file-upload-specs">Supports PNG, JPG, JPEG, WEBP files</span>
                  </div>
                </div>
                {imageFile && <p className="selected-filename-badge">📎 Target asset ready: <strong>{imageFile.name}</strong></p>}
              </div>

              <div className="dash-form-actions">
                <button type="submit" className="btn-dash-submit">
                  PUSH TO LIVE STREAM
                </button>
              </div>

              {statusMessage && (
                <div className="status-banner-notice">
                  <p className="dash-status-alert">{statusMessage}</p>
                </div>
              )}
            </form>

            <div className="dash-clean-divider dev-split-line"></div>

            <div className="management-workspace-block">
              <div className="management-heading-meta">
                <h3>Live Repository & Categories Cleanups</h3>
                <p>Monitor active image frames online, drop specific assets or remove entire categories instantly.</p>
              </div>

              {allItems.length > 0 ? (
                <>
                  {categories.length > 0 && (
                    <div className="category-deleter-rack">
                      <span className="rack-label-title">PERMANENT CATEGORY PURGE (WITH IMAGE CASCADE REMOVALS)</span>
                      <div className="category-btn-flex-row">
                        {categories.map((cat, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="btn-wipe-category"
                            onClick={() => handleDeleteCategory(cat)}
                          >
                            🗑️ Wipe {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="management-media-grid">
                    {allItems.map((item) => (
                      <div key={item._id} className="management-item-card">
                        <div className="card-media-preview-box">
                          <img src={item.imageUrl} alt={item.title} />
                          <button
                            type="button"
                            className="btn-delete-card-image"
                            onClick={() => handleDeleteItem(item._id, item.title)}
                            title="Delete this asset frame"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="card-info-caption-box">
                          <span className="badge-item-category">{item.category}</span>
                          <h4 className="label-item-title" title={item.title}>{item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="empty-repo-banner">
                  <p>No active images found inside the website lookbook loop.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE EVENTS SCHEDULER VIEW */}
        {activeTab === 'events' && (
          <div className="dash-full-pane-container">
            <div className="dash-clean-header">
              <div className="header-meta-left">
                <span>REBOOT VENUE CALENDAR</span>
                <h2>EVENT SCHEDULE MATRIX</h2>
              </div>
            </div>

            <div className="dash-clean-divider"></div>

            <form className="dash-clean-form" onSubmit={handleEventSubmit}>
              <div className="dash-form-row">
                <div className="dash-input-group">
                  <label>Event Performance Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Neon Overdrive: DJ Electro Night"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="dash-input-group">
                  <label>Calendar Booking Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="dash-input-group">
                <label>Performers / Headlining DJs</label>
                <input
                  type="text"
                  placeholder="e.g., DJ KAPPA | MC FLASH (vertical bar separated roster list)"
                  value={eventPerformers}
                  onChange={(e) => setEventPerformers(e.target.value)}
                  required
                />
              </div>

              <div className="dash-input-group">
                <label>Event Description & Headliner Notes</label>
                <textarea
                  rows="3"
                  className="dash-textarea-input"
                  placeholder="Provide entry specifications, timing logs, and VIP reservation details..."
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* --- NEW: DYNAMIC TICKET & TABLE PRICING BUILDER --- */}
              {/* --- NEW: EVENT ACCESS CLASSIFICATION SWITCH --- */}
              <div className="dash-input-group access-toggle-group">
                <label>Event Entry Access Classification</label>
                <div className="access-switch-container">
                  <button
                    type="button"
                    className={`switch-btn ${isPaid ? 'active-paid' : ''}`}
                    onClick={() => setIsPaid(true)}
                  >
                    🎟️ Paid Tickets / Reservations
                  </button>
                  <button
                    type="button"
                    className={`switch-btn ${!isPaid ? 'active-free' : ''}`}
                    onClick={() => setIsPaid(false)}
                  >
                    🎉 Free Entry / Open Night
                  </button>
                </div>
              </div>

              {/* --- CONDITIONAL DYNAMIC TICKET BUILDER (Only shows if Paid) --- */}
              {isPaid && (
                <div className="dash-input-group pricing-builder-group">
                  <div className="pricing-builder-header">
                    <label>Ticket Categories & Table Pricing (₦)</label>
                    <button type="button" className="btn-add-tier" onClick={handleAddTier}>
                      ➕ Add Category
                    </button>
                  </div>

                  <div className="tiers-container">
                    {ticketTiers.map((tier, idx) => (
                      <div key={idx} className="tier-input-row">
                        <div className="tier-field cat-name">
                          <input
                            type="text"
                            placeholder="Category (e.g., VIP, TABLE OF 6)"
                            value={tier.tierName}
                            onChange={(e) => handleTierChange(idx, 'tierName', e.target.value)}
                            required
                          />
                        </div>

                        <div className="tier-field cat-price">
                          <input
                            type="number"
                            placeholder="Price (₦)"
                            value={tier.price}
                            onChange={(e) => handleTierChange(idx, 'price', e.target.value)}
                            required
                            min="0"
                          />
                        </div>

                        <div className="tier-field cat-desc">
                          <input
                            type="text"
                            placeholder="Perks (e.g., Includes 1 Bottle)"
                            value={tier.description}
                            onChange={(e) => handleTierChange(idx, 'description', e.target.value)}
                          />
                        </div>

                        <button
                          type="button"
                          className="btn-remove-tier"
                          onClick={() => handleRemoveTier(idx)}
                          title="Remove this category"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="dash-input-group">
                <label>Upload Event Promo Flyer Image</label>
                <div className="file-upload-dropzone">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEventFlyerFile(e.target.files[0])}
                    required
                  />
                  <div className="dropzone-prompt-content">
                    <span className="dropzone-icon">📅</span>
                    <p className="file-upload-tip">Browse folder or drop target event flyer file</p>
                    <span className="file-upload-specs">Supports dynamic aspect ratio image assets</span>
                  </div>
                </div>
                {eventFlyerFile && <p className="selected-filename-badge">📎 Flyer selected: <strong>{eventFlyerFile.name}</strong></p>}
              </div>

              <div className="dash-form-actions">
                <button type="submit" className="btn-dash-submit">
                  RELEASE TO VENUE CALENDAR
                </button>
              </div>

              {eventStatusMessage && (
                <div className="status-banner-notice">
                  <p className="dash-status-alert">{eventStatusMessage}</p>
                </div>
              )}
            </form>

            <div className="dash-clean-divider dev-split-line"></div>

            <div className="management-workspace-block">
              <div className="management-heading-meta">
                <h3>Live Active Events Loop</h3>
                <p>Track your calendar schedules, monitor upcoming promotional dates, or wipe historical shows.</p>
              </div>

              {allEvents.length > 0 ? (
                <div className="management-media-grid">
                  {allEvents.map((ev) => {
                    const displayDate = new Date(ev.date).toLocaleDateString('en-US', {
                      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                    });

                    return (
                      <div key={ev._id} className="management-item-card event-card-variant">
                        <div className="card-media-preview-box event-box-height">
                          <img src={ev.flyerUrl} alt={ev.title} />
                          <button
                            type="button"
                            className="btn-delete-card-image"
                            onClick={() => handleDeleteEvent(ev._id, ev.title)}
                          >
                            ✕
                          </button>
                        </div>
                        
                        <div className="card-info-caption-box">
                          <div style={{ display: 'flex', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span className="badge-item-category event-date-badge">🗓️ {displayDate}</span>
                            
                            {/* Dynamic Switch Status Badge correctly inside the loop context */}
                            {ev.isPaid === false ? (
                              <span className="badge-item-category" style={{ background: '#dcfce7', color: '#16a34a', borderColor: '#bbf7d0' }}>🎉 FREE ENTRY</span>
                            ) : (
                              <span className="badge-item-category" style={{ background: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' }}>🎟️ TICKETS</span>
                            )}
                          </div>

                          <h4 className="label-item-title" title={ev.title}>{ev.title}</h4>
                          {ev.performers && <p style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b', margin: '4px 0 0 0' }}>🎧 {ev.performers}</p>}

                          {/* Display Configured Ticket Tiers */}
                          {ev.ticketTiers && ev.ticketTiers.length > 0 && (
                            <div className="event-tier-pills">
                              {ev.ticketTiers.map((t, index) => (
                                <span key={index} className="tier-pill-badge" title={t.description}>
                                  {t.tierName}: ₦{t.price.toLocaleString()}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="event-desc-snip-preview" title={ev.description}>{ev.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-repo-banner">
                  <p>No upcoming events recorded on the timeline sheet yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

            {/* ROADMAP PLACEHOLDERS */}
            {activeTab === 'bookings' && (
              <div className="dash-full-pane-container central-placeholder">
                <span className="placeholder-icon-badge">🗓️</span>
                <h3>Booking Services ledger</h3>
                <p>Phase 3: Live ledger table to approve, check-in, or cancel guest requests coming straight from the booking portal link.</p>
              </div>
            )}

            {activeTab === 'food' && (
              <div className="dash-full-pane-container central-placeholder">
                <span className="placeholder-icon-badge">🍔</span>
                <h3>Food & Kitchen Dispatch Queue</h3>
                <p>Phase 4: Real-time order grid to process incoming VIP table orders and edit digital menu availability toggles.</p>
              </div>
            )}
          </main>
    </div>
  );
}
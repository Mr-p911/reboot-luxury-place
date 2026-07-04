import React, { useState } from 'react';

// Color Variable Mapping (Mental Model)
// --color-reboot-dark: #060913; (Deepest BG)
// --color-reboot-card: #111625; (Container BG)
// --color-reboot-purple: #8B5CF6; (Neon Accent/Interaction)
// --color-reboot-gold: #D4AF37; (Luxury/CTA)

function RebootLoungeWebsite() {
  const [activeTab, setActiveTab] = useState('drinks');

  const menuItems = {
    drinks: ['Classic Mojito', 'Signature Chapman', 'Hennessy VS', 'Glenfiddich 18'],
    food: ['Spaghetti Bolognese', 'Jollof Rice Special', 'Club Sandwich', 'Grilled Fish Platter']
  };

  return (
    <div className="bg-reboot-dark text-slate-100 min-h-screen font-sans antialiased">

      {/* 1. NAVBAR - Premium Depth with Backdrop Blur */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-reboot-dark/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* logo uses reboots-gold and white */}
          <div className="text-2xl font-black text-slate-100 tracking-tighter">
            REBOOT <span className="text-reboot-gold">LUXURY</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-reboot-purple transition-colors">About</a>
            <a href="#menu" className="hover:text-reboot-purple transition-colors">Menu</a>
            <a href="#events" className="hover:text-reboot-purple transition-colors">Events</a>
            {/* The main action is highlighted in reboot-gold */}
            <a href="#booking" className="bg-reboot-gold text-reboot-dark px-5 py-2.5 rounded-full font-bold hover:brightness-110 transition-all text-xs shadow-lg shadow-reboot-gold/20">
              RESERVE A TABLE
            </a>
          </div>
        </div>
      </nav>

      {/* 2. HERO - Full Height, Selling the Energy */}
      <section className="h-screen flex items-center justify-center pt-20 bg-[url('/path/to/hero_bg.jpg')] bg-cover bg-center">
        {/* Simple dark overlay to pop text */}
        <div className="absolute inset-0 bg-reboot-dark/60 z-0"></div>
        <div className="relative z-10 text-center max-w-4xl">
          {/* Main heading in crisp white, accent in gold */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-100 leading-none">
            Elevate Your <span className="text-reboot-gold">Nightlife</span>.
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
            Experience premium mixology, exclusive lounges, and high-energy music at Awka's premier entertainment destination.
          </p>
          {/* Secondary CTA is less loud, but still high priority */}
          <button className="mt-10 inline-flex items-center gap-2 group bg-reboot-purple/10 border border-reboot-purple/50 text-reboot-purple px-8 py-3.5 rounded-full font-bold transition-all hover:bg-reboot-purple hover:text-white shadow-lg shadow-reboot-purple/10">
            EXPLORE THE VIBE
          </button>
        </div>
      </section>

      {/* 3. MENU SECTION - Interactive Tabs and Lists */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight text-center">Gourmet & Spirits</h2>

        {/* The active tab uses reboot-purple */}
        <div className="flex justify-center gap-2 mt-12 bg-reboot-card p-2 rounded-full border border-slate-800 max-w-sm mx-auto">
          {['drinks', 'food'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 rounded-full text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-reboot-purple text-white'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu list with subtle dividers */}
        <div className="mt-16 bg-reboot-card p-10 rounded-3xl border border-slate-800 shadow-xl shadow-reboot-dark/40">
          <ul className="space-y-6">
            {menuItems[activeTab].map(item => (
              <li key={item} className="flex items-center justify-between py-4 border-b border-slate-800 last:border-0">
                <span className="text-lg font-medium text-slate-100">{item}</span>
                {/* VIP items can use gold highlights */}
                {item.includes('Hennessy') && <span className="text-xs text-reboot-gold px-3 py-1 rounded-full border border-reboot-gold/30 font-mono">PREMIUM</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. EVENTS SECTION - Visual Cards */}
      <section id="events" className="py-24 px-6 bg-reboot-dark/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-center">Upcoming Events</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {/* Event cards use reboot-card, with reboot-purple glow on hover */}
            {[1, 2, 3].map(item => (
              <div key={item} className="bg-reboot-card p-6 rounded-3xl border border-slate-800 transition-all duration-300 hover:border-reboot-purple hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] group">
                <div className="h-64 bg-slate-700 rounded-2xl overflow-hidden">
                  <img src="/path/to/event_flyer.jpg" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-100">AFROBEATS FRIDAYS</h3>
                <p className="mt-2 text-slate-400 text-sm">Join us for the hottest weekly party in Awka. DJ Skyline on the deck.</p>
                <div className="mt-6 flex justify-between items-center text-sm font-mono text-reboot-purple">
                  <span>NOV 17</span>
                  <span>10 PM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - Clear Contact and Address */}
      <footer className="py-12 px-6 mt-20 border-t border-slate-800 bg-reboot-dark">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-sm text-slate-400">
          <div>
            <div className="text-lg font-black text-slate-100 tracking-tighter">REBOOT <span className="text-reboot-gold">LUXURY</span></div>
            <p className="mt-3">Elevating the nightlife experience on Geneva Hotel Road, Awka.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-100">Connect</h4>
            <div className="mt-3 space-y-2">
              <a href="#" className="block hover:text-reboot-purple">Instagram</a>
              <a href="#" className="block hover:text-reboot-purple">TikTok</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-100">Reservations</h4>
            <div className="mt-3 space-y-2">
              <span className="block">+234 (0) 800 000 0000</span>
              <span className="block">Open Daily: 4:00 PM – Late</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default RebootLoungeWebsite;
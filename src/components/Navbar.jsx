import React, {useState} from "react";
import './Navbar.css'


export default function Navbar() {

    const[isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    return(   
        <>
            <nav className="navbar" >
                <div className="logo">
                    REBOOT <span className="logo-accent">LUXURY</span>
                </div>
                <div className="navbar-controls">
                    <a href="#booking">
                        <button className="btn-book">BOOK <span className="tab">RESERVATION</span></button>
                    </a>
                    <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="pcNav">
                    <a href="#home" className="u">Home</a>
                    <a href="#about" className="u">About us</a>
                    <a href="#location" className="u">Location</a>
                    <a href="#services" className="u">Services</a>
                    <a href="#events" className="u">Events</a>
                    <a href="#contact" className="u">Contact Us</a>
                    <a href="#booking">
                        <button className="btn-book-pc">BOOK RESERVATION</button>
                    </a>
                </div>
            </nav>
            <div className={`mobileMenuItems ${isMenuOpen ? 'open' : ''}`}>
                <nav className='mobileNav'>
                    <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
                    <a href="#about" onClick={() => setIsMenuOpen(false)}>About us</a>
                    <a href="#location" onClick={() => setIsMenuOpen(false)}>Location</a>
                    <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
                    <a href="#events" onClick={() => setIsMenuOpen(false)}>Events</a>
                    <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
                </nav>
            </div>
        </>
    )
}
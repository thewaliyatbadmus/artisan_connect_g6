
import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home',   label: 'Home' },
    { id: 'search', label: 'Find Artisans' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <button className="navbar-logo" onClick={() => { onNavigate('home'); setMenuOpen(false); }}>
          <span className="logo-mark">A</span>
          <span className="logo-text">ArtisanConnect</span>
        </button>

        {/* Desktop Nav */}
        <div className="navbar-links">
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`nav-link ${currentPage === link.id ? 'active' : ''}`}
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          <button className="btn btn-ghost">Login</button>
          <button className="btn btn-primary btn-sm">Sign Up</button>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`mobile-link ${currentPage === link.id ? 'active' : ''}`}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
            >
              {link.label}
            </button>
          ))}
          <div className="mobile-auth">
            <button className="btn btn-outline btn-full">Login</button>
            <button className="btn btn-primary btn-full">Sign Up Free</button>
          </div>
        </div>
      )}
    </nav>
  );
}

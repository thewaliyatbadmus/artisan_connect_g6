import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ currentPage, onNavigate, user, onLogout }) {
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

  const initials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'U';

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner container">
        <button className="navbar-logo" onClick={() => { onNavigate('home'); setMenuOpen(false); }}>
          <span className="logo-mark">A</span>
          <span className="logo-text">ArtisanConnect</span>
        </button>

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
          {user && (
            <button
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => onNavigate('dashboard')}
            >
              My Bookings
            </button>
          )}
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="navbar-user">
              <button
                className={`navbar-user-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => onNavigate('dashboard')}
              >
                <span className="navbar-user-avatar">{initials(user.name)}</span>
                <span className="navbar-user-name">{user.name.split(' ')[0]}</span>
              </button>
              <button className="btn-ghost nav-logout" onClick={onLogout}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => onNavigate('login')}>Login</button>
              <button className="btn btn-primary btn-sm" onClick={() => onNavigate('signup')}>Sign Up</button>
            </>
          )}
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

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
          {user && (
            <button
              className={`mobile-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }}
            >
              My Bookings
            </button>
          )}
          <div className="mobile-auth">
            {user ? (
              <>
                <div className="mobile-user-info">
                  <span className="navbar-user-avatar">{initials(user.name)}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</span>
                </div>
                <button className="btn btn-outline btn-full" onClick={() => { onLogout(); setMenuOpen(false); }}>Logout</button>
              </>
            ) : (
              <>
                <button className="btn btn-outline btn-full" onClick={() => { onNavigate('login'); setMenuOpen(false); }}>Login</button>
                <button className="btn btn-primary btn-full" onClick={() => { onNavigate('signup'); setMenuOpen(false); }}>Sign Up Free</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

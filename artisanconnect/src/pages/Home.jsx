
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { ArtisanCard } from '../components/ArtisanCard';
import { artisans, categories } from '../data/artisans';
import './Home.css';

export default function Home({ onNavigate, onFilterSearch, onViewProfile, onBook }) {
  const [heroSearch, setHeroSearch] = useState('');
  const featured = artisans.slice(0, 4);

  const handleHeroSearch = (val) => {
    onFilterSearch(val);
    onNavigate('search');
  };

  return (
    <div className="home-page">

      {}
      <section className="hero">
        <div className="hero-content fade-up">
          <span className="hero-badge">🇷🇼 Serving Rwanda</span>
          <h1 className="hero-title">
            Find Trusted Artisans<br />
            <span>Near You</span>
          </h1>
          <p className="hero-desc">
            Connect with skilled plumbers, electricians, tailors, carpenters and more — quickly and easily.
          </p>
          <div className="hero-search fade-up fade-up-2">
            <SearchBar
              value={heroSearch}
              onChange={setHeroSearch}
              onSearch={handleHeroSearch}
              placeholder="Search by skill (e.g. plumber, tailor…)"
              large
            />
          </div>
          <div className="hero-tags fade-up fade-up-3">
            {['Plumbing', 'Electrical', 'Tailoring', 'Carpentry'].map(t => (
              <button key={t} className="hero-tag" onClick={() => handleHeroSearch(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="hero-img-wrap fade-up fade-up-2">
          <img
            src=""
            alt="Skilled artisan at work"
            className="hero-img"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=700&fit=crop'; }}
          />
          <div className="hero-float-card hero-float-1">
            <span className="hfc-icon">⭐</span>
            <div>
              <div className="hfc-val">4.8/5</div>
              <div className="hfc-lbl">Average Rating</div>
            </div>
          </div>
          <div className="hero-float-card hero-float-2">
            <span className="hfc-icon">👷</span>
            <div>
              <div className="hfc-val">200+</div>
              <div className="hfc-lbl">Skilled Artisans</div>
            </div>
          </div>
        </div>
      </section>

      {}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-inner">
            <div className="stat-item"><span className="stat-n">200+</span><span className="stat-l">Artisans</span></div>
            <div className="stat-sep" />
            <div className="stat-item"><span className="stat-n">8</span><span className="stat-l">Skill Categories</span></div>
            <div className="stat-sep" />
            <div className="stat-item"><span className="stat-n">1,200+</span><span className="stat-l">Jobs Done</span></div>
            <div className="stat-sep" />
            <div className="stat-item"><span className="stat-n">5</span><span className="stat-l">Districts</span></div>
          </div>
        </div>
      </div>

      {}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Popular <span>Categories</span></h2>
          <div className="cat-grid">
            {categories.map((cat, i) => (
              <button
                key={cat.value}
                className="cat-card fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => { onFilterSearch(cat.label); onNavigate('search'); }}
              >
                <div className="cat-img-wrap">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="cat-img"
                    onError={e => { e.target.style.display='none'; }}
                  />
                  <div className="cat-overlay" />
                </div>
                <div className="cat-info">
                  <span className="cat-label">{cat.label}</span>
                  <span className="cat-count">{cat.count} artisans</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading-row">
            <h2 className="section-heading" style={{ marginBottom: 0 }}>Featured <span>Artisans</span></h2>
            <button className="btn btn-outline" onClick={() => onNavigate('search')}>View All →</button>
          </div>
          <div className="featured-grid">
            {featured.map((a, i) => (
              <div key={a.id} className="fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <ArtisanCard
                  artisan={a}
                  onViewProfile={onViewProfile}
                  onBook={onBook}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section">
        <div className="container">
          <h2 className="section-heading" style={{ textAlign: 'center' }}>How <span>It Works</span></h2>
          <div className="how-grid">
            {[
              { step: '01', icon: '', title: 'Search', desc: 'Search for the artisan skill you need in your area.' },
              { step: '02', icon: '', title: 'View Profile', desc: 'Check ratings, experience, portfolio and reviews.' },
              { step: '03', icon: '', title: 'Book', desc: 'Send a booking request with your preferred date.' },
              { step: '04', icon: '', title: 'Get It Done', desc: 'Artisan arrives, does the work, you pay and review.' },
            ].map((s, i) => (
              <div key={s.step} className="how-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="how-step">{s.step}</div>
                <div className="how-icon">{s.icon}</div>
                <h4 className="how-title">{s.title}</h4>
                <p className="how-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <h2>Are You an Artisan?</h2>
              <p>Join ArtisanConnect and reach more customers in your area today.</p>
            </div>
            <button className="btn btn-accent" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
              Register as Artisan →
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
                <span className="logo-mark" style={{ width: 30, height: 30, fontSize: '0.85rem' }}>A</span>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>ArtisanConnect</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', maxWidth: 200 }}>
                Connecting customers with skilled artisans across Rwanda.
              </p>
            </div>
            <div className="footer-links-group">
              <span className="footer-group-title">Platform</span>
              <a href="#!" className="footer-link">About Us</a>
              <a href="#!" className="footer-link">How It Works</a>
              <a href="#!" className="footer-link">For Artisans</a>
            </div>
            <div className="footer-links-group">
              <span className="footer-group-title">Support</span>
              <a href="#!" className="footer-link">Contact</a>
              <a href="#!" className="footer-link">FAQ</a>
              <a href="#!" className="footer-link">Privacy Policy</a>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} ArtisanConnect. University Software Engineering Project. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

import React from 'react';
import ReviewCard from '../components/ReviewCard';
import './Profile.css';

function StarRating({ rating }) {
  return (
    <span style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? 'var(--accent)' : 'none'}
          stroke="var(--accent)" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

export default function Profile({ artisanId, artisans, onBack, onBook }) {
  const artisan = artisans.find(a => a.id === artisanId);
  if (!artisan) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
      <p>Artisan not found.</p>
      <button className="btn btn-primary" onClick={onBack} style={{ marginTop: '1rem' }}>Go Back</button>
    </div>
  );

  return (
    <div className="profile-page">

      {/* ── Cover + Avatar ── */}
      <div className="profile-cover">
        <img
          src={artisan.coverPhoto}
          alt="cover"
          className="profile-cover-img"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=400&fit=crop'; }}
        />
        <div className="profile-cover-overlay" />
        <button className="profile-back-btn" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
      </div>

      <div className="container profile-body">

        {/* ── Header Card ── */}
        <div className="profile-header-card">
          <div className="profile-avatar-wrap">
            <img
              src={artisan.photo}
              alt={artisan.name}
              className="profile-avatar"
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artisan.name)}&background=1a6b4a&color=fff&size=200`; }}
            />
            <span className={`profile-avail-badge ${artisan.available ? 'available' : 'busy'}`}>
              {artisan.available ? '● Available' : '● Busy'}
            </span>
          </div>
          <div className="profile-header-info">
            <div className="profile-header-top">
              <div>
                <h1 className="profile-name">{artisan.name}</h1>
                <span className="profile-skill-tag">{artisan.skill}</span>
              </div>
              <div className="profile-header-actions">
                <a href={`tel:${artisan.phone}`} className="btn btn-outline">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 5.87 5.87l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call
                </a>
                <button
                  className="btn btn-primary"
                  onClick={() => onBook(artisan)}
                  disabled={!artisan.available}
                  style={{ opacity: artisan.available ? 1 : 0.55 }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {artisan.available ? 'Book Service' : 'Currently Busy'}
                </button>
              </div>
            </div>
            <div className="profile-meta-row">
              <span className="profile-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {artisan.location}
              </span>
              <span className="profile-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {artisan.experience} years experience
              </span>
              <span className="profile-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                {artisan.rating} ({artisan.reviewCount} reviews)
              </span>
              <span className="profile-meta-item profile-rate">
                {artisan.hourlyRate}/hr
              </span>
            </div>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="profile-grid">

          {/* Left Column */}
          <div className="profile-left">

            {/* Stats */}
            <div className="profile-card">
              <div className="profile-stats">
                <div className="pstat">
                  <span className="pstat-val">{artisan.experience}</span>
                  <span className="pstat-lbl">Yrs Experience</span>
                </div>
                <div className="pstat-div" />
                <div className="pstat">
                  <span className="pstat-val">{artisan.rating}</span>
                  <span className="pstat-lbl">Avg Rating</span>
                </div>
                <div className="pstat-div" />
                <div className="pstat">
                  <span className="pstat-val">{artisan.reviewCount}</span>
                  <span className="pstat-lbl">Reviews</span>
                </div>
                <div className="pstat-div" />
                <div className="pstat">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <StarRating rating={artisan.rating} />
                  </div>
                  <span className="pstat-lbl">Stars</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="profile-card">
              <h2 className="profile-card-title">About</h2>
              <p className="profile-bio">{artisan.bio}</p>
            </div>

            {/* Contact Info */}
            <div className="profile-card">
              <h2 className="profile-card-title">Contact Info</h2>
              <div className="contact-row">
                <span className="contact-icon"></span>
                <span>{artisan.location}, Rwanda</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon"></span>
                <a href={`tel:${artisan.phone}`} style={{ color: 'var(--primary)' }}>{artisan.phone}</a>
              </div>
              <div className="contact-row">
                <span className="contact-icon"></span>
                <span>{artisan.hourlyRate} per hour</span>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="profile-right">

            {/* Portfolio */}
            <div className="profile-card">
              <h2 className="profile-card-title">Portfolio</h2>
              <div className="portfolio-grid">
                {artisan.portfolio.map((item, i) => (
                  <div key={i} className="portfolio-item">
                    <img
                      src={item.img}
                      alt={item.caption}
                      className="portfolio-img"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop'; }}
                    />
                    <div className="portfolio-caption">{item.caption}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="profile-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 className="profile-card-title" style={{ marginBottom: 0 }}>
                  Reviews <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 500 }}>({artisan.reviewCount})</span>
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <StarRating rating={artisan.rating} />
                  <strong style={{ fontSize: '1rem' }}>{artisan.rating}</strong>
                </div>
              </div>
              {artisan.reviews.map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
              <button className="btn btn-outline btn-full" style={{ marginTop: '1rem' }}>
                View All Reviews
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Book Button */}
        <div className="profile-mobile-book">
          <button
            className="btn btn-primary btn-full"
            onClick={() => onBook(artisan)}
            disabled={!artisan.available}
            style={{ padding: '1rem', fontSize: '1rem', opacity: artisan.available ? 1 : 0.55 }}
          >
            {artisan.available ? '📅 Book Service Now' : '🔴 Currently Busy'}
          </button>
        </div>
      </div>
    </div>
  );
}

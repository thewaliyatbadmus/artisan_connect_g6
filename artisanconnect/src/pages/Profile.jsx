// pages/Profile.jsx
import React, { useState } from 'react';
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

export default function Profile({ artisanId, artisans, onBack, onBook, user, isOwnProfile, onUpdateProfile }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    skill: user?.profession || '',
    location: user?.location || '',
    experience: user?.experience || '',
    phone: user?.phone || '',
    hourlyRate: user?.hourlyRate || '',
    priceRange: user?.priceRange || '',
    bio: user?.bio || ''
  });

  let artisan;
  if (isOwnProfile && user) {
    artisan = {
      id: user.id || 'own',
      name: user.name || 'Your Name',
      skill: user.skill || user.profession || 'Skill',
      location: user.location || 'Location',
      experience: user.experience || 0,
      phone: user.phone || 'N/A',
      hourlyRate: (user.hourlyRate || user.rate) ? `${user.hourlyRate || user.rate} RWF` : 'Contact for pricing',
      priceRange: user.priceRange || null,
      rating: user.rating || 4.5,
      reviewCount: user.reviewCount || 0,
      available: true,
      bio: user.bio || 'Professional artisan',
      photo: user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=1a6b4a&color=fff&size=200`,
      coverPhoto: user.coverPhoto || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=400&fit=crop',
      portfolio: user.portfolio || [],
      reviews: user.reviews || []
    };
  } else {
    artisan = artisans && artisans.find(a => a.id === artisanId);
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (onUpdateProfile) {
      onUpdateProfile(editForm);
      setIsEditMode(false);
    }
  };
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
                {!isOwnProfile && (
                  <>
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
                  </>
                )}
                {isOwnProfile && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditMode(true)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                    Edit Profile
                  </button>
                )}
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
              {artisan.priceRange && (
                <span className="profile-meta-item profile-price-range">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                   <path d="M12 1v22M5 6h14M5 18h14"/>
                  </svg>
                   Price: {artisan.priceRange}
                </span>
              )}
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
                <span className="contact-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                <span>{artisan.location}, Rwanda</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                <a href={`tel:${artisan.phone}`} style={{ color: 'var(--primary)' }}>{artisan.phone}</a>
              </div>
              <div className="contact-row">
                <span className="contact-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
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
        {!isOwnProfile && (
          <div className="profile-mobile-book">
            <button
              className="btn btn-primary btn-full"
              onClick={() => onBook(artisan)}
              disabled={!artisan.available}
              style={{ padding: '1rem', fontSize: '1rem', opacity: artisan.available ? 1 : 0.55 }}
            >
              {artisan.available ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Book Service Now
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                  Currently Busy
                </>
              )}
            </button>
          </div>
        )}

        {/* Edit Profile Modal */}
        {isOwnProfile && isEditMode && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setIsEditMode(false)}>
            <div className="modal" style={{ maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>Edit Your Profile</h2>
                <button onClick={() => setIsEditMode(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    placeholder="Your full name"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Your Skill/Profession</label>
                  <input
                    type="text"
                    name="skill"
                    value={editForm.skill}
                    onChange={handleEditChange}
                    placeholder="e.g., Plumber, Electrician, Carpenter"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    placeholder="e.g., Kigali, Muhima"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={editForm.experience}
                    onChange={handleEditChange}
                    placeholder="e.g., 5"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    placeholder="e.g., +250 788 123 456"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Hourly Rate (RWF)</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={editForm.hourlyRate}
                    onChange={handleEditChange}
                    placeholder="e.g., 5000"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Price Range (RWF)</label>
                  <input
                    type="text"
                    name="priceRange"
                    value={editForm.priceRange}
                    onChange={handleEditChange}
                    placeholder="e.g., 10,000–50,000"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Bio</label>
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleEditChange}
                    placeholder="Tell customers about yourself and your experience"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', minHeight: '100px', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div className="modal-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                <button className="btn-cancel" onClick={() => setIsEditMode(false)}>Cancel</button>
                <button
                  className="btn btn-primary"
                  onClick={handleSaveProfile}
                  style={{ flex: 1 }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

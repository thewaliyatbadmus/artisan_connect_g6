// components/ArtisanCard.jsx
import React from 'react';
import './ArtisanCard.css';

function StarRating({ rating }) {
  return (
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}


export function ArtisanCard({ artisan, onViewProfile, onBook }) {
  return (
    <div className="artisan-card" onClick={() => onViewProfile(artisan.id)}>
      <div className="artisan-card-img-wrap">
        <img
          src={artisan.photo}
          alt={artisan.name}
          className="artisan-card-img"
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artisan.name)}&background=1a6b4a&color=fff&size=200`; }}
        />
        <span className={`artisan-avail-dot ${artisan.available ? 'available' : 'busy'}`} title={artisan.available ? 'Available' : 'Busy'} />
      </div>
      <div className="artisan-card-body">
        <div className="artisan-card-top">
          <span className="artisan-skill-tag">{artisan.skill}</span>
          <span className="artisan-rating">
            <StarRating rating={artisan.rating} />
            <span className="rating-num">{artisan.rating}</span>
            <span className="rating-count">({artisan.reviewCount})</span>
          </span>
        </div>
        <h3 className="artisan-name">{artisan.name}</h3>
        <div className="artisan-meta-row">
          <span className="artisan-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {artisan.location}
          </span>
          <span className="artisan-exp">{artisan.experience} yrs exp</span>
        </div>
        <div className="artisan-card-footer">
          <span className="artisan-rate">{artisan.hourlyRate}/hr</span>
          <button
            className="btn btn-outline btn-sm-card"
            onClick={e => { e.stopPropagation(); onViewProfile(artisan.id); }}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}


export function ArtisanCardH({ artisan, onViewProfile, onBook }) {
  return (
    <div className="artisan-card-h">
      <div className="artisan-card-h-img-wrap">
        <img
          src={artisan.photo}
          alt={artisan.name}
          className="artisan-card-h-img"
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artisan.name)}&background=1a6b4a&color=fff&size=200`; }}
        />
        <span className={`artisan-avail-dot ${artisan.available ? 'available' : 'busy'}`} />
      </div>
      <div className="artisan-card-h-body">
        <div className="artisan-card-h-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2px' }}>
              <h3 className="artisan-name" style={{ fontSize: '1rem', marginBottom: 0 }}>{artisan.name}</h3>
              <span className={`badge ${artisan.available ? 'badge-green' : 'badge-gray'}`}>
                {artisan.available ? '● Available' : '● Busy'}
              </span>
            </div>
            <span className="artisan-skill-tag" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{artisan.skill}</span>
          </div>
          <span className="artisan-rate" style={{ whiteSpace: 'nowrap' }}>{artisan.hourlyRate}/hr</span>
        </div>
        <div className="artisan-meta-row" style={{ marginBottom: '0.85rem' }}>
          <span className="artisan-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {artisan.location}
          </span>
          <span className="artisan-exp">{artisan.experience} yrs experience</span>
          <span className="artisan-rating">
            <StarRating rating={artisan.rating} />
            <span className="rating-num">{artisan.rating}</span>
            <span className="rating-count">({artisan.reviewCount} reviews)</span>
          </span>
        </div>
        <div className="artisan-card-h-actions">
          <button className="btn btn-outline" onClick={() => onViewProfile(artisan.id)}>View Profile</button>
          <button
            className="btn btn-primary"
            onClick={e => { e.stopPropagation(); onBook(artisan); }}
            disabled={!artisan.available}
            style={{ opacity: artisan.available ? 1 : 0.5 }}
          >
            {artisan.available ? 'Send Booking Request' : 'Currently Busy'}
          </button>
        </div>
      </div>
    </div>
  );
}

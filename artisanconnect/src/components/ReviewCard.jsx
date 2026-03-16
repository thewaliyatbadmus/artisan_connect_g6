
import React from 'react';
import './ReviewCard.css';

function Stars({ count }) {
  return (
    <span className="review-stars">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= count ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-avatar">{review.initials}</div>
        <div className="review-meta">
          <span className="review-name">{review.name}</span>
          <span className="review-date">{review.date}</span>
        </div>
        <div className="review-stars-wrap">
          <Stars count={review.stars} />
        </div>
      </div>
      <p className="review-text">{review.text}</p>
    </div>
  );
}

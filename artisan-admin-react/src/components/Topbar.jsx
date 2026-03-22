import React from 'react';

const PAGE_TITLES = {
  overview: 'Overview',
  users:    'All Users',
  artisans: 'All Artisans',
  bookings: 'Bookings',
  reviews:  'Reviews',
};

export default function Topbar({ currentPage, onShowToast }) {
  const title = PAGE_TITLES[currentPage] || currentPage;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">{title}</h1>
        <span className="page-breadcrumb">Admin / {title}</span>
      </div>
      <div className="topbar-right">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search anything…"
            className="topbar-search"
          />
        </div>
        <button className="icon-btn" onClick={() => onShowToast('No new notifications.')}>
          🔔
          <span className="notif-dot"></span>
        </button>
      </div>
    </header>
  );
}

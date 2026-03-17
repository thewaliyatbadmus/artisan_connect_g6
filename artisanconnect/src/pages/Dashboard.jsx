import React, { useState } from 'react';
import './Dashboard.css';

const STATUS_COLORS = {
  Pending:   { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
  Confirmed: { bg: '#d1fae5', color: '#065f46', dot: '#10b981' },
  Completed: { bg: '#dbeafe', color: '#1e40af', dot: '#3b82f6' },
  Cancelled: { bg: '#fee2e2', color: '#991b1b', dot: '#ef4444' },
};

const MOCK_CUSTOMER_BOOKINGS = [
  { id: 1, artisan: 'Jean Paul Habimana', skill: 'Plumbing', date: '2025-04-12', service: 'Emergency Service', status: 'Confirmed', phone: '+250 788 123 456', photo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&h=100&fit=crop&crop=face' },
  { id: 2, artisan: 'Marie Uwimana', skill: 'Tailoring', date: '2025-04-18', service: 'Custom Work', status: 'Pending', phone: '+250 788 234 567', photo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=100&h=100&fit=crop&crop=face' },
  { id: 3, artisan: 'Samuel Munyaneza', skill: 'Carpentry', date: '2025-03-28', service: 'Installation', status: 'Completed', phone: '+250 788 456 789', photo: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop&crop=face' },
  { id: 4, artisan: 'Patrick Niyonzima', skill: 'Painting', date: '2025-03-15', service: 'General Repair', status: 'Completed', phone: '+250 788 678 901', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { id: 5, artisan: 'Ange Mukamana', skill: 'Welding', date: '2025-04-25', service: 'Custom Work', status: 'Pending', phone: '+250 788 567 890', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face' },
];

const MOCK_ARTISAN_REQUESTS = [
  { id: 1, customer: 'Alice Nzeyimana', phone: '+250 788 001 001', date: '2025-04-12', service: 'Emergency Service', status: 'Confirmed', message: 'Burst pipe in kitchen, need urgent help.' },
  { id: 2, customer: 'Bernard Karekezi', phone: '+250 788 002 002', date: '2025-04-18', service: 'Installation', status: 'Pending', message: 'New bathroom fittings, 3 items to install.' },
  { id: 3, customer: 'Claudette Mukam.', phone: '+250 788 003 003', date: '2025-03-28', service: 'General Repair', status: 'Completed', message: 'Leaking tap under kitchen sink.' },
  { id: 4, customer: 'David Umuhoza', phone: '+250 788 004 004', date: '2025-04-22', service: 'Inspection', status: 'Pending', message: 'Full plumbing inspection before house sale.' },
];

export default function Dashboard({ user, onNavigate, onLogout, newBookings }) {
  const [filter, setFilter] = useState('All');
  const [cancelId, setCancelId] = useState(null);

  const isArtisan = user?.role === 'artisan';

  const allBookings = [
    ...(newBookings || []),
    ...MOCK_CUSTOMER_BOOKINGS,
  ];

  const filters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

  const visibleBookings = filter === 'All' ? allBookings : allBookings.filter(b => b.status === filter);
  const visibleRequests = filter === 'All' ? MOCK_ARTISAN_REQUESTS : MOCK_ARTISAN_REQUESTS.filter(r => r.status === filter);

  const stats = isArtisan ? {
    total:     MOCK_ARTISAN_REQUESTS.length,
    pending:   MOCK_ARTISAN_REQUESTS.filter(b => b.status === 'Pending').length,
    confirmed: MOCK_ARTISAN_REQUESTS.filter(b => b.status === 'Confirmed').length,
    completed: MOCK_ARTISAN_REQUESTS.filter(b => b.status === 'Completed').length,
  } : {
    total:     allBookings.length,
    pending:   allBookings.filter(b => b.status === 'Pending').length,
    confirmed: allBookings.filter(b => b.status === 'Confirmed').length,
    completed: allBookings.filter(b => b.status === 'Completed').length,
  };

  const formatDate = (d) => {
    try { return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return d; }
  };

  const initials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'U';

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <div className="dash-header-inner">
            <div className="dash-welcome">
              <div className={`dash-avatar ${isArtisan ? 'dash-avatar-artisan' : ''}`}>{initials(user?.name || 'User')}</div>
              <div>
                <div className="dash-role-tag">
                  {isArtisan ? (
                    <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> Artisan{user?.profession ? ` · ${user.profession}` : ''}</>
                  ) : (
                    <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Customer</>
                  )}
                </div>
                <h1 className="dash-title">Welcome, <span>{user?.name?.split(' ')[0] || 'User'}</span></h1>
                <p className="dash-subtitle">
                  {isArtisan ? 'Manage incoming booking requests from customers' : 'Track your booking requests and history'}
                </p>
              </div>
            </div>
            <div className="dash-header-actions">
              {!isArtisan && (
                <button className="btn btn-outline dash-btn-find" onClick={() => onNavigate('search')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Find Artisans
                </button>
              )}
              <button className="dash-logout-btn" onClick={onLogout}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container dash-body">

        {isArtisan && user?.profession && (
          <div className="artisan-profile-bar fade-up">
            <div className="apb-info">
              <div className="apb-avatar">{initials(user.name)}</div>
              <div>
                <div className="apb-name">{user.name}</div>
                <div className="apb-details">
                  <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>{user.profession}</span>
                  {user.rate && <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>{Number(user.rate).toLocaleString()} RWF/hr</span>}
                  {user.location && <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>{user.location}</span>}
                  {user.phone && <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>{user.phone}</span>}
                </div>
              </div>
            </div>
            <span className="badge badge-green apb-badge">
              <span style={{ width: 7, height: 7, background: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
              Active
            </span>
          </div>
        )}

        <div className="dash-stats-row">
          <div className="dash-stat-card fade-up">
            <div className="dash-stat-icon dash-stat-icon-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div>
              <div className="dash-stat-n">{stats.total}</div>
              <div className="dash-stat-l">{isArtisan ? 'Total Requests' : 'Total Bookings'}</div>
            </div>
          </div>
          <div className="dash-stat-card fade-up fade-up-1">
            <div className="dash-stat-icon dash-stat-icon-amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <div className="dash-stat-n">{stats.pending}</div>
              <div className="dash-stat-l">Pending</div>
            </div>
          </div>
          <div className="dash-stat-card fade-up fade-up-2">
            <div className="dash-stat-icon dash-stat-icon-green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div className="dash-stat-n">{stats.confirmed}</div>
              <div className="dash-stat-l">Confirmed</div>
            </div>
          </div>
          <div className="dash-stat-card fade-up fade-up-3">
            <div className="dash-stat-icon dash-stat-icon-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div>
              <div className="dash-stat-n">{stats.completed}</div>
              <div className="dash-stat-l">Completed</div>
            </div>
          </div>
        </div>

        <div className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">
              {isArtisan ? 'Incoming Booking Requests' : 'My Bookings'}
            </h2>
            <div className="dash-filters">
              {filters.map(f => (
                <button key={f} className={`dash-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>

          {isArtisan ? (
            visibleRequests.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
                <p className="dash-empty-title">No {filter !== 'All' ? filter.toLowerCase() : ''} requests yet</p>
                <p className="dash-empty-sub">Booking requests from customers will appear here.</p>
              </div>
            ) : (
              <div className="dash-bookings-list">
                {visibleRequests.map((r, i) => {
                  const st = STATUS_COLORS[r.status] || STATUS_COLORS['Pending'];
                  return (
                    <div key={r.id} className="dash-booking-card artisan-request-card fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="dbc-artisan">
                        <div className="dbc-customer-avatar">{r.customer.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}</div>
                        <div className="dbc-info">
                          <div className="dbc-name">{r.customer}</div>
                          <div className="dbc-skill" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{r.service}</div>
                        </div>
                      </div>
                      <div className="dbc-detail">
                        <div className="dbc-detail-item">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          {formatDate(r.date)}
                        </div>
                        <div className="dbc-detail-item dbc-message">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          {r.message}
                        </div>
                      </div>
                      <div className="dbc-phone">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <a href={`tel:${r.phone}`}>{r.phone}</a>
                      </div>
                      <div className="dbc-status-wrap">
                        <span className="dbc-status" style={{ background: st.bg, color: st.color }}>
                          <span className="dbc-status-dot" style={{ background: st.dot }} />
                          {r.status}
                        </span>
                      </div>
                      <div className="dbc-actions">
                        {r.status === 'Pending' && (
                          <div className="artisan-action-btns">
                            <button className="dbc-accept-btn">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                              Accept
                            </button>
                            <button className="dbc-cancel-btn" onClick={() => setCancelId(r.id)}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            visibleBookings.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
                <p className="dash-empty-title">No {filter !== 'All' ? filter.toLowerCase() : ''} bookings yet</p>
                <p className="dash-empty-sub">When you book an artisan, it will appear here.</p>
                <button className="btn btn-primary" onClick={() => onNavigate('search')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Find an Artisan
                </button>
              </div>
            ) : (
              <div className="dash-bookings-list">
                {visibleBookings.map((b, i) => {
                  const st = STATUS_COLORS[b.status] || STATUS_COLORS['Pending'];
                  return (
                    <div key={b.id || i} className="dash-booking-card fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="dbc-artisan">
                        <img src={b.photo} alt={b.artisan} className="dbc-photo"
                          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(b.artisan)}&background=1a6b4a&color=fff&size=80`; }} />
                        <div className="dbc-info">
                          <div className="dbc-name">{b.artisan}</div>
                          <div className="dbc-skill">{b.skill}</div>
                        </div>
                      </div>
                      <div className="dbc-detail">
                        <div className="dbc-detail-item">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          {formatDate(b.date)}
                        </div>
                        <div className="dbc-detail-item">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                          {b.service}
                        </div>
                      </div>
                      <div className="dbc-phone">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <a href={`tel:${b.phone}`}>{b.phone}</a>
                      </div>
                      <div className="dbc-status-wrap">
                        <span className="dbc-status" style={{ background: st.bg, color: st.color }}>
                          <span className="dbc-status-dot" style={{ background: st.dot }} />
                          {b.status}
                        </span>
                      </div>
                      <div className="dbc-actions">
                        {(b.status === 'Pending' || b.status === 'Confirmed') && (
                          <button className="dbc-cancel-btn" onClick={() => setCancelId(b.id || i)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>

        <div className="dash-info-cards">
          {isArtisan ? (
            <>
              <div className="dash-info-card">
                <div className="dash-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div className="dash-info-title">Contacting Customers</div>
                  <div className="dash-info-text">When you accept a request, call the customer on the phone number shown to confirm details and arrange the visit.</div>
                </div>
              </div>
              <div className="dash-info-card">
                <div className="dash-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div>
                  <div className="dash-info-title">Managing Requests</div>
                  <div className="dash-info-text">Accept requests you can fulfill, decline ones you can't. Keeping your status up to date helps customers find available artisans.</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="dash-info-card">
                <div className="dash-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div className="dash-info-title">Artisan Contact</div>
                  <div className="dash-info-text">After your booking is confirmed, the artisan will call you on the phone number you provided in your booking.</div>
                </div>
              </div>
              <div className="dash-info-card">
                <div className="dash-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div>
                  <div className="dash-info-title">Booking Status</div>
                  <div className="dash-info-text">Bookings go: Pending → Confirmed → Completed. You can cancel pending or confirmed bookings at any time.</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {cancelId !== null && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setCancelId(null)}>
          <div className="modal" style={{ maxWidth: 380 }}>
            <div className="dash-confirm-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              {isArtisan ? 'Decline Request?' : 'Cancel Booking?'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              {isArtisan ? 'This will decline the customer request. This cannot be undone.' : 'This will cancel your booking request. This action cannot be undone.'}
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setCancelId(null)}>Keep It</button>
              <button className="btn btn-full" style={{ background: '#ef4444', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.9rem' }} onClick={() => setCancelId(null)}>
                {isArtisan ? 'Yes, Decline' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

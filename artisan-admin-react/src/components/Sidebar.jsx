import React from 'react';

const NAV_ITEMS = [
  { id: 'overview', icon: '◈', label: 'Overview'     },
  { id: 'users',    icon: '◉', label: 'All Users'    },
  { id: 'artisans', icon: '◆', label: 'All Artisans' },
  { id: 'bookings', icon: '◇', label: 'Bookings'     },
  { id: 'reviews',  icon: '★', label: 'Reviews'      },
];

export default function Sidebar({ currentPage, onNavigate, pendingCount, userCount, bookingCount, adminUser, onLogout }) {
  const initials = adminUser?.name
    ? adminUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'A';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">⚙</span>
        <div>
          <div className="logo-name">ArtisanConnect</div>
          <div className="logo-sub">Admin Panel</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.id === 'users'    && <span className="nav-badge">{userCount}</span>}
            {item.id === 'artisans' && (
              <span className={`nav-badge ${pendingCount > 0 ? 'pending' : ''}`}>
                {pendingCount > 0 ? pendingCount : ''}
              </span>
            )}
            {item.id === 'bookings' && <span className="nav-badge">{bookingCount}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="admin-chip">
          <div className="admin-avatar">{initials}</div>
          <div>
            <div className="admin-name">{adminUser?.name || 'Admin'}</div>
            <div className="admin-role">{adminUser?.role || 'Full Access'}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={onLogout}>Sign Out</button>
      </div>
    </aside>
  );
}
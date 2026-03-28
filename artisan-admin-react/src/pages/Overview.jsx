import React from 'react';
import { formatDate, statusBadgeClass, capitalize } from '../utils/helpers';

export default function Overview({ users, artisans, bookings, onNavigate, onApprove, onReject }) {
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pending        = artisans.filter(a => a.status === 'pending');

  return (
    <div className="page-content">
      {/* ── Stat Cards ── */}
      <div className="stats-grid">
        <div className="stat-card fade-up fade-up-1">
          <div className="stat-icon green">◉</div>
          <div className="stat-info">
            <div className="stat-value">{users.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-trend up">+3 this week</div>
        </div>
        <div className="stat-card fade-up fade-up-2">
          <div className="stat-icon amber">◆</div>
          <div className="stat-info">
            <div className="stat-value">{artisans.filter(a => a.status === 'approved').length}</div>
            <div className="stat-label">Total Artisans</div>
          </div>
          <div className="stat-trend up">+2 this week</div>
        </div>
        <div className="stat-card fade-up fade-up-3">
          <div className="stat-icon blue">◇</div>
          <div className="stat-info">
            <div className="stat-value">{activeBookings.length}</div>
            <div className="stat-label">Active Bookings</div>
          </div>
          <div className="stat-trend neutral">Ongoing</div>
        </div>
        <div className="stat-card fade-up fade-up-4">
          <div className="stat-icon red">⏳</div>
          <div className="stat-info">
            <div className="stat-value">{pending.length}</div>
            <div className="stat-label">Pending Approvals</div>
          </div>
          <div className="stat-trend warn">Needs review</div>
        </div>
      </div>

      {/* ── Bottom Grid ── */}
      <div className="overview-grid">
        {/* Recent Bookings */}
        <div className="panel fade-up">
          <div className="panel-head">
            <h2 className="panel-title">Recent Bookings</h2>
            <button className="link-btn" onClick={() => onNavigate('bookings')}>See all →</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Artisan</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map(b => {
                const customer = users.find(u => u.id === b.customerId);
                const artisan  = artisans.find(a => a.id === b.artisanId);
                return (
                  <tr key={b.id}>
                    <td>{customer?.name || '—'}</td>
                    <td>{artisan?.name  || '—'}</td>
                    <td>{b.service}</td>
                    <td><span className={`badge ${statusBadgeClass(b.status)}`}>{capitalize(b.status)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pending Approvals */}
        <div className="panel fade-up">
          <div className="panel-head">
            <h2 className="panel-title">Pending Artisan Approvals</h2>
            <button className="link-btn" onClick={() => onNavigate('artisans')}>See all →</button>
          </div>
          {pending.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">✅</div>
              <div className="empty-state-text">No pending approvals right now.</div>
            </div>
          ) : (
            pending.map(a => (
              <div key={a.id} className="pending-card">
                <div className="artisan-thumb">{a.initials}</div>
                <div className="pending-card-info">
                  <div className="pending-card-name">{a.name}</div>
                  <div className="pending-card-skill">{a.skill} · {a.location}</div>
                </div>
                <div className="pending-card-btns">
                  <button className="btn btn-approve" onClick={() => onApprove(a.id)}>✓ Approve</button>
                  <button className="btn btn-reject"  onClick={() => onReject(a.id)}>✗ Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

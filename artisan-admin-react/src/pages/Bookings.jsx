import React, { useState } from 'react';
import { formatDate, statusBadgeClass, capitalize } from '../utils/helpers';

export default function Bookings({ bookings, users, artisans }) {
  const [query,        setQuery]        = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = bookings.filter(b => {
    const customer = users.find(u => u.id === b.customerId);
    const artisan  = artisans.find(a => a.id === b.artisanId);
    const text     = `${b.id} ${customer?.name} ${artisan?.name} ${b.service}`.toLowerCase();
    const matchesQuery  = text.includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="page-content">
      <div className="panel fade-up">
        <div className="panel-head">
          <h2 className="panel-title">
            All Bookings <span className="count-chip">{filtered.length}</span>
          </h2>
          <div className="panel-actions">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              type="text"
              placeholder="Filter bookings…"
              className="filter-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">◇</div>
            <div className="empty-state-text">No bookings match your search.</div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Artisan</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => {
                const customer = users.find(u => u.id === b.customerId);
                const artisan  = artisans.find(a => a.id === b.artisanId);
                return (
                  <tr key={b.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {b.id}
                    </td>
                    <td>{customer?.name || '—'}</td>
                    <td>
                      <div className="artisan-cell">
                        {artisan && <div className="artisan-thumb">{artisan.initials}</div>}
                        <span>{artisan?.name || '—'}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{b.service}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatDate(b.date)}</td>
                    <td>
                      <span className={`badge ${statusBadgeClass(b.status)}`}>{capitalize(b.status)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { statusBadgeClass, capitalize, ratingStars } from '../utils/helpers';

export default function Artisans({ artisans, onDelete, onApprove, onReject }) {
  const [query,        setQuery]        = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = artisans.filter(a => {
    const matchesQuery  = `${a.name} ${a.skill} ${a.location}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="page-content">
      <div className="panel fade-up">
        <div className="panel-head">
          <h2 className="panel-title">
            All Artisans <span className="count-chip">{filtered.length}</span>
          </h2>
          <div className="panel-actions">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Filter artisans…"
              className="filter-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">◆</div>
            <div className="empty-state-text">No artisans match your search.</div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Artisan</th>
                <th>Skill</th>
                <th>Location</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td>
                    <div className="artisan-cell">
                      <div className="artisan-thumb">{a.initials}</div>
                      <div>
                        <div className="artisan-cell-name">{a.name}</div>
                        <div className="artisan-cell-email">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-teal">{a.skill}</span></td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{a.location}</td>
                  <td>
                    {a.rating ? (
                      <span>
                        <span style={{ color: 'var(--accent)', fontSize: '0.82rem' }}>{ratingStars(a.rating)}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 4 }}>{a.rating}</span>
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>No ratings yet</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${statusBadgeClass(a.status)}`}>{capitalize(a.status)}</span>
                  </td>
                  <td>
                    <div className="action-btns">
                      {a.status === 'pending' && (
                        <>
                          <button className="btn btn-approve" onClick={() => onApprove(a.id)}>✓</button>
                          <button className="btn btn-reject"  onClick={() => onReject(a.id)}>✗</button>
                        </>
                      )}
                      <button className="btn btn-danger" onClick={() => onDelete('artisan', a.id, a.name)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

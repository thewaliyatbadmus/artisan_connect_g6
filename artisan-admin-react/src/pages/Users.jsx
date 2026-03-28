import React, { useState } from 'react';
import { formatDate, statusBadgeClass, capitalize } from '../utils/helpers';

export default function Users({ users, onDelete }) {
  const [query, setQuery] = useState('');

  const filtered = users.filter(u =>
    `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page-content">
      <div className="panel fade-up">
        <div className="panel-head">
          <h2 className="panel-title">
            All Users <span className="count-chip">{filtered.length}</span>
          </h2>
          <div className="panel-actions">
            <input
              type="text"
              placeholder="Filter users…"
              className="filter-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">◉</div>
            <div className="empty-state-text">No users match your search.</div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="artisan-cell">
                      <div className="artisan-thumb">{u.name.charAt(0)}</div>
                      <div className="artisan-cell-name">{u.name}</div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{u.email}</td>
                  <td><span className={`badge ${statusBadgeClass(u.role)}`}>{capitalize(u.role)}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{formatDate(u.joined)}</td>
                  <td><span className={`badge ${statusBadgeClass(u.status)}`}>● {capitalize(u.status)}</span></td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="btn btn-danger"
                        onClick={() => onDelete('user', u.id, u.name)}
                      >
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

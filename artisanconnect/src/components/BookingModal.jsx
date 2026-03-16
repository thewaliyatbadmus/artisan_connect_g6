import React, { useState } from 'react';

export default function BookingModal({ artisan, onClose }) {
  const [date, setDate]       = useState('');
  const [service, setService] = useState('General Repair');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]     = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!date) { setError('Please select a service date.'); return; }
    setError('');
    setSubmitted(true);
  };

  const formatted = date
    ? new Date(date).toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
    : '';

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Send Booking Request
        </div>

        {}
        <div className="modal-artisan-info">
          <img
            src={artisan.photo}
            alt={artisan.name}
            className="modal-artisan-img"
            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artisan.name)}&background=1a6b4a&color=fff&size=100`; }}
          />
          <div>
            <div className="modal-artisan-name">{artisan.name}</div>
            <div className="modal-artisan-skill">{artisan.skill} • {artisan.location}</div>
          </div>
          <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Available</span>
        </div>

        {!submitted ? (
          <>
            <div className="form-group">
              <label>Service Date *</label>
              <input type="date" min={today} value={date} onChange={e => { setDate(e.target.value); setError(''); }} />
            </div>
            <div className="form-group">
              <label>Service Type</label>
              <select value={service} onChange={e => setService(e.target.value)}>
                <option>General Repair</option>
                <option>Installation</option>
                <option>Inspection</option>
                <option>Custom Work</option>
                <option>Emergency Service</option>
                <option>Consultation</option>
              </select>
            </div>
            <div className="form-group">
              <label>Your Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={`Describe the work you need done by ${artisan.name}…`}
              />
            </div>
            {error && (
              <p style={{ color: 'var(--accent-dark)', fontSize: '0.83rem', marginBottom: '0.5rem' }}>{error}</p>
            )}
            <div className="modal-actions">
              <button className="btn-cancel" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary btn-full" onClick={handleSubmit}>Send Request</button>
            </div>
          </>
        ) : (
          <div className="success-banner">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <strong>Booking request sent!</strong><br/>
            Your request has been sent to <strong>{artisan.name}</strong> for <strong>{formatted}</strong>.<br/>
            <span style={{ color: '#065f46', fontSize: '0.82rem' }}>They will contact you at your registered phone number shortly.</span>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={onClose}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

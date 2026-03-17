import React, { useState } from 'react';

export default function BookingModal({ artisan, onClose, onBooked }) {
  const [date, setDate]       = useState('');
  const [service, setService] = useState('General Repair');
  const [phone, setPhone]     = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]     = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!date) { setError('Please select a service date.'); return; }
    if (!phone) { setError('Please enter your phone number.'); return; }
    if (!/^\+?[\d\s\-]{9,15}$/.test(phone)) { setError('Enter a valid phone number.'); return; }
    setError('');
    setSubmitted(true);
    if (onBooked) {
      onBooked({
        id: Date.now(),
        artisan: artisan.name,
        skill: artisan.skill,
        date,
        service,
        phone,
        status: 'Pending',
        photo: artisan.photo,
      });
    }
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
              <label>Your Phone Number *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <svg style={{ position: 'absolute', left: '0.85rem', color: 'var(--text-light)', pointerEvents: 'none' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <input
                  type="tel"
                  placeholder="+250 7XX XXX XXX"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setError(''); }}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
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
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <div style={{ width: 52, height: 52, background: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
            <strong>Booking request sent!</strong><br/>
            Your request has been sent to <strong>{artisan.name}</strong> for <strong>{formatted}</strong>.<br/>
            <span style={{ color: '#065f46', fontSize: '0.82rem' }}>
              The artisan will contact you on <strong>{phone}</strong> shortly.
            </span>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={onClose}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

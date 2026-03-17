import React, { useState } from 'react';
import './Auth.css';

const SKILLS = ['Plumbing','Electrical','Carpentry','Tailoring','Welding','Painting','Masonry','Mechanics','Other'];

export default function Signup({ onNavigate, onLogin }) {
  const [role, setRole] = useState('');
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', profession: '', rate: '', location: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(''); };

  const handleRoleSelect = (r) => {
    setRole(r);
    setStep(2);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirm) {
      setError('Please fill in all required fields.'); return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setError('Enter a valid email address.'); return; }
    if (!/^\+?[\d\s\-]{9,15}$/.test(form.phone)) { setError('Enter a valid phone number.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (role === 'artisan') {
      if (!form.profession) { setError('Please select your profession.'); return; }
      if (!form.rate) { setError('Please enter your hourly rate.'); return; }
      if (!form.location) { setError('Please enter your location.'); return; }
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: form.name, email: form.email, phone: form.phone, role, profession: form.profession, rate: form.rate, location: form.location });
    }, 900);
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#10b981'];

  const visualTitle = role === 'artisan'
    ? 'Grow Your Business with ArtisanConnect'
    : 'Find Trusted Artisans Near You';

  const visualSub = role === 'artisan'
    ? 'Reach more customers across Rwanda. Register your skills and start getting booked today.'
    : 'Create your free account and start booking skilled artisans in your area today.';

  const artisanPerks = [
    { text: 'Get discovered by customers near you' },
    { text: 'Manage bookings in one place' },
    { text: 'Build your professional reputation' },
    { text: 'Free to join, no hidden fees' },
  ];

  const customerPerks = [
    { text: 'Instant booking requests' },
    { text: 'Track all your bookings' },
    { text: 'Verified & rated artisans' },
    { text: '100% free for customers' },
  ];

  const perks = role === 'artisan' ? artisanPerks : customerPerks;

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-side-visual">
          <div className="auth-visual-overlay" />
          <img
            src={role === 'artisan'
              ? 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&h=1200&fit=crop'
              : 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&h=1200&fit=crop'}
            alt="ArtisanConnect"
            className="auth-visual-img"
          />
          <div className="auth-visual-content">
            <div className="auth-visual-logo">
              <span className="logo-mark" style={{ width: 40, height: 40, fontSize: '1.1rem' }}>A</span>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>ArtisanConnect</span>
            </div>
            <h2 className="auth-visual-title">{visualTitle}</h2>
            <p className="auth-visual-sub">{visualSub}</p>
            <div className="auth-perks">
              {perks.map((p, i) => (
                <div key={i} className="auth-perk">
                  <span className="auth-perk-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-form-wrap fade-up">
            <button className="auth-back-btn" onClick={() => step === 2 ? setStep(1) : onNavigate('home')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
              {step === 2 ? 'Back' : 'Back to Home'}
            </button>

            {step === 1 ? (
              <>
                <div className="auth-header">
                  <h1 className="auth-title">Create your account</h1>
                  <p className="auth-subtitle">Who are you joining as?</p>
                </div>

                <div className="role-selector">
                  <button
                    className={`role-card ${role === 'customer' ? 'active' : ''}`}
                    onClick={() => handleRoleSelect('customer')}
                    type="button"
                  >
                    <div className="role-card-icon role-icon-customer">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div className="role-card-text">
                      <span className="role-card-title">I'm a Customer</span>
                      <span className="role-card-sub">I want to hire skilled artisans</span>
                    </div>
                    <div className="role-card-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                    </div>
                  </button>

                  <button
                    className={`role-card ${role === 'artisan' ? 'active' : ''}`}
                    onClick={() => handleRoleSelect('artisan')}
                    type="button"
                  >
                    <div className="role-card-icon role-icon-artisan">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    </div>
                    <div className="role-card-text">
                      <span className="role-card-title">I'm an Artisan</span>
                      <span className="role-card-sub">I want to offer my skills & get hired</span>
                    </div>
                    <div className="role-card-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                    </div>
                  </button>
                </div>

                <div className="auth-divider"><span>or</span></div>
                <p className="auth-switch">
                  Already have an account?{' '}
                  <button className="auth-switch-btn" onClick={() => onNavigate('login')}>Sign in</button>
                </p>
              </>
            ) : (
              <>
                <div className="auth-header">
                  <div className="role-badge-inline">
                    {role === 'artisan' ? (
                      <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> Registering as Artisan</>
                    ) : (
                      <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Registering as Customer</>
                    )}
                  </div>
                  <h1 className="auth-title">Your details</h1>
                  <p className="auth-subtitle">Fill in your information to create your account</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <div className="input-icon-wrap">
                        <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <input type="text" placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <div className="input-icon-wrap">
                        <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <input type="tel" placeholder="+250 7XX XXX XXX" value={form.phone} onChange={e => update('phone', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <div className="input-icon-wrap">
                      <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <input type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                    </div>
                  </div>

                  {role === 'artisan' && (
                    <div className="artisan-extra-fields">
                      <div className="artisan-fields-label">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        Professional Details
                      </div>
                      <div className="form-row-2">
                        <div className="form-group">
                          <label>Your Profession *</label>
                          <div className="input-icon-wrap">
                            <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            <select value={form.profession} onChange={e => update('profession', e.target.value)} style={{ paddingLeft: '2.5rem' }}>
                              <option value="">Select profession</option>
                              {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Hourly Rate (RWF) *</label>
                          <div className="input-icon-wrap">
                            <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            <input type="number" placeholder="e.g. 5000" min="0" value={form.rate} onChange={e => update('rate', e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Your Location *</label>
                        <div className="input-icon-wrap">
                          <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          <select value={form.location} onChange={e => update('location', e.target.value)} style={{ paddingLeft: '2.5rem' }}>
                            <option value="">Select your district</option>
                            {['Kigali','Huye','Musanze','Rubavu','Nyagatare','Muhanga','Rusizi','Rwamagana','Other'].map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Password *</label>
                      <div className="input-icon-wrap">
                        <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input
                          type={showPass ? 'text' : 'password'}
                          placeholder="Min. 6 characters"
                          value={form.password}
                          onChange={e => update('password', e.target.value)}
                        />
                        <button type="button" className="pass-toggle" onClick={() => setShowPass(v => !v)}>
                          {showPass ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          )}
                        </button>
                      </div>
                      {form.password.length > 0 && (
                        <div className="pass-strength">
                          <div className="pass-strength-bar">
                            {[1,2,3].map(n => (
                              <div key={n} className="pass-strength-seg" style={{ background: strength >= n ? strengthColor[strength] : 'var(--border)' }} />
                            ))}
                          </div>
                          <span style={{ color: strengthColor[strength], fontSize: '0.75rem', fontWeight: 600 }}>{strengthLabel[strength]}</span>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Confirm Password *</label>
                      <div className="input-icon-wrap">
                        <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input type={showPass ? 'text' : 'password'} placeholder="Repeat password" value={form.confirm} onChange={e => update('confirm', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {error && <div className="auth-error">{error}</div>}

                  <button type="submit" className="btn btn-primary btn-full auth-submit" disabled={loading}>
                    {loading ? (
                      <span className="auth-spinner" />
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                        Create {role === 'artisan' ? 'Artisan' : 'Customer'} Account
                      </>
                    )}
                  </button>
                </form>

                <div className="auth-divider"><span>or</span></div>
                <p className="auth-switch">
                  Already have an account?{' '}
                  <button className="auth-switch-btn" onClick={() => onNavigate('login')}>Sign in</button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

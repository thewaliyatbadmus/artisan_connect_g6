import React, { useState } from 'react';
import './Auth.css';

export default function Login({ onNavigate, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User';
      onLogin({ name, email });
    }, 900);
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-side-visual">
          <div className="auth-visual-overlay" />
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&h=1200&fit=crop"
            alt="Artisan at work"
            className="auth-visual-img"
          />
          <div className="auth-visual-content">
            <div className="auth-visual-logo">
              <span className="logo-mark" style={{ width: 40, height: 40, fontSize: '1.1rem' }}>A</span>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>ArtisanConnect</span>
            </div>
            <h2 className="auth-visual-title">Connect with Rwanda's Finest Artisans</h2>
            <p className="auth-visual-sub">Book skilled professionals quickly and easily — plumbers, electricians, tailors and more.</p>
            <div className="auth-visual-stats">
              <div className="auth-stat">
                <span className="auth-stat-n">200+</span>
                <span className="auth-stat-l">Artisans</span>
              </div>
              <div className="auth-stat">
                <span className="auth-stat-n">1,200+</span>
                <span className="auth-stat-l">Jobs Done</span>
              </div>
              <div className="auth-stat">
                <span className="auth-stat-n">4.8★</span>
                <span className="auth-stat-l">Avg Rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-form-wrap fade-up">
            <button className="auth-back-btn" onClick={() => onNavigate('home')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
              Back to Home
            </button>

            <div className="auth-header">
              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-subtitle">Sign in to your ArtisanConnect account</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-icon-wrap">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label>Password</label>
                  <button type="button" className="forgot-link">Forgot password?</button>
                </div>
                <div className="input-icon-wrap">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    autoComplete="current-password"
                  />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(v => !v)}>
                    {showPass ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="btn btn-primary btn-full auth-submit" disabled={loading}>
                {loading ? (
                  <span className="auth-spinner" />
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider"><span>or</span></div>

            <p className="auth-switch">
              Don't have an account?{' '}
              <button className="auth-switch-btn" onClick={() => onNavigate('signup')}>Create one free</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

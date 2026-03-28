import React, { useState } from 'react';

const ADMIN_ACCOUNTS = [
  { id: 'adm1', name: 'Jummy Badmus',    email: 'jummy@artisanconnect.com',  password: 'admin123', role: 'Super Admin' },
  { id: 'adm2', name: 'Nelson Ishimwe',     email: 'nelson@artisanconnect.com',   password: 'admin123', role: 'Moderator'   },
  { id: 'adm3', name: 'Shakilla Uwamahoro',    email: 'shakilla@artisanconnect.com',  password: 'admin123', role: 'Support'     },
];

export default function Login({ onLogin }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const match = ADMIN_ACCOUNTS.find(
        a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
      );

      if (match) {
        onLogin(match);
      } else {
        setError('Incorrect email or password. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="login-page">
      <div className="login-card fade-up">

        {/* Logo */}
        <div className="login-logo">
          <span className="login-logo-icon">⚙</span>
          <div>
            <div className="login-logo-name">ArtisanConnect</div>
            <div className="login-logo-sub">Admin Portal</div>
          </div>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to access the admin dashboard.</p>

        {error && (
          <div className="login-error">{error}</div>
        )}

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@artisanconnect.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          className="btn btn-primary btn-full login-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <p className="login-hint">
          🔒 This portal is restricted to authorised administrators only.
        </p>


      </div>
    </div>
  );
}
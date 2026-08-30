import React, { useState } from 'react';

// Round 1: Output from vague prompt: "make a user settings form with validation"
export const UserSettingsForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('developer');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // AI Mistake 1: Whitespace strings like "   " pass this validation check
    if (!name) {
      setError('Please enter your name');
      return;
    }

    // AI Mistake 2: Oversimplified email check allows "test@" or "@domain" without regex or domain check
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    // AI Mistake 3: No submission in-flight lock (double submit bug if user spam-clicks)
    setTimeout(() => {
      console.log('Saved settings:', { name, email, bio, role, emailNotifications });
      setSuccess(true);
    }, 500);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>User Settings (Round 1: Vague Prompt)</h1>
        <p>Built with minimal unconstrained prompt</p>
      </div>

      {error && <div className="form-error" style={{ marginBottom: '1rem' }}>{error}</div>}
      {success && <div className="alert-success">Settings saved successfully!</div>}

      <form onSubmit={handleSubmit}>
        {/* AI Mistake 4: Missing htmlFor link between label and input (accessibility flaw) */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea
            className="form-textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Brief bio..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
          <label>Receive email updates</label>
        </div>

        <button type="submit" className="btn-submit">
          Save Settings
        </button>
      </form>
    </div>
  );
};

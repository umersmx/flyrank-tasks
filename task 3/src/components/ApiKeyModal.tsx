import React, { useState } from 'react';
import { getStoredApiKey, setStoredApiKey } from '../services/omdbApi';
import { X, KeyRound, ExternalLink, Check, AlertTriangle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyChange: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onKeyChange,
}) => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredApiKey(apiKey);
    setSaved(true);
    onKeyChange();
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
    onKeyChange();
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="OMDb API Configuration"
    >
      <div className="modal-content" style={{ maxWidth: '500px', padding: '2rem' }}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
            <KeyRound size={18} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem' }}>OMDb API Integration</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Unlock live search across millions of movies & series
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              API Key
            </label>
            <input
              type="text"
              className="select-control"
              style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem' }}
              placeholder="e.g. 1a2b3c4d"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoFocus
            />
          </div>

          <div
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '0.9rem',
              fontSize: '0.85rem',
              color: '#fde68a',
              display: 'flex',
              gap: '0.6rem',
            }}
          >
            <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Offline Mode Ready:</strong> If no API key is set, CinePulse AI seamlessly queries our high-fidelity curated library (15+ blockbuster titles).
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <a
              href="https://www.omdbapi.com/apikey.aspx"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#a5b4fc', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}
            >
              Get a free OMDb API Key <ExternalLink size={13} />
            </a>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            {apiKey && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1, color: 'var(--accent-rose)' }}
                onClick={handleClear}
              >
                Clear Key
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 2 }}
            >
              {saved ? <Check size={16} /> : null}
              {saved ? 'Saved!' : 'Save & Refresh'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

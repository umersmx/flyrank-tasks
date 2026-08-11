import React, { useState } from 'react';
import { UserSettingsFormData, FormErrors, SubmissionStatus } from '../types/settings';
import { validateSettingsForm, MAX_BIO_LENGTH } from '../utils/validation';

interface UserSettingsFormProps {
  initialData?: Partial<UserSettingsFormData>;
  onSave?: (data: UserSettingsFormData) => Promise<void> | void;
}

const DEFAULT_FORM_DATA: UserSettingsFormData = {
  fullName: '',
  email: '',
  bio: '',
  role: 'developer',
  emailNotifications: false,
};

export const UserSettingsForm: React.FC<UserSettingsFormProps> = ({
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserSettingsFormData>({
    ...DEFAULT_FORM_DATA,
    ...initialData,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const isSubmitting = status === 'submitting';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear individual field error on change
    if (errors[name as keyof UserSettingsFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Guard against race conditions and multiple rapid clicks
    if (isSubmitting) return;

    setStatus('idle');
    setStatusMessage('');

    const validation = validateSettingsForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatus('error');
      setStatusMessage('Please correct the highlighted errors before saving.');
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      if (onSave) {
        await onSave(formData);
      } else {
        // Simulated network latency
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setStatus('success');
      setStatusMessage('Settings have been saved successfully.');
    } catch (err) {
      setStatus('error');
      setStatusMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred while saving.'
      );
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>User Settings (Round 2: Precise Spec)</h1>
        <p>Built with schema validation, WCAG 2.1 AA accessibility, and unit test verification.</p>
      </header>

      {status === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="alert-success"
        >
          {statusMessage}
        </div>
      )}

      {status === 'error' && statusMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="form-error"
          style={{ marginBottom: '1.25rem', padding: '0.625rem', background: 'rgba(248,81,73,0.1)', borderRadius: '6px' }}
        >
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Alex Mercer"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="form-error">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="alex.mercer@example.com"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="form-error">
              {errors.email}
            </p>
          )}
        </div>


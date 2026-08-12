import { UserSettingsFormData, FormErrors } from '../types/settings';

// RFC 5322 compliant simplified robust email pattern
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const MAX_BIO_LENGTH = 160;

export function validateSettingsForm(data: UserSettingsFormData): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  // Edge case fix: Trim string to prevent whitespace-only bypass
  const trimmedName = data.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Full name is required and cannot be blank.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  } else if (trimmedName.length > 50) {
    errors.fullName = 'Full name cannot exceed 50 characters.';
  }

  // Edge case fix: Robust regex instead of naive string.includes('@')
  const trimmedEmail = data.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address (e.g. name@domain.com).';
  }

  // Bio length boundary validation
  if (data.bio && data.bio.length > MAX_BIO_LENGTH) {
    errors.bio = `Bio cannot exceed ${MAX_BIO_LENGTH} characters (currently ${data.bio.length}).`;
  }

  // Enum validation
  const validRoles = ['developer', 'designer', 'manager', 'researcher'];
  if (!validRoles.includes(data.role)) {
    errors.role = 'Please select a valid role.';
  }

export type UserRole = 'developer' | 'designer' | 'manager' | 'researcher';

export interface UserSettingsFormData {
  fullName: string;
  email: string;
  bio: string;
  role: UserRole;
  emailNotifications: boolean;
}

export type FormErrors = Partial<Record<keyof UserSettingsFormData, string>>;

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

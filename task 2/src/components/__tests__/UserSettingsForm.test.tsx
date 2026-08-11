import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserSettingsForm } from '../UserSettingsForm';

describe('UserSettingsForm (Round 2 Verified Specification)', () => {
  it('renders all form fields with accessible labels and initial state', () => {
    render(<UserSettingsForm />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary Role/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Subscribe to AI engineering digest/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Settings/i })).toBeEnabled();
  });

  it('rejects whitespace-only input and displays accessible validation error', async () => {
    render(<UserSettingsForm />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });

    // AI Mistake Caught: Round 1 allowed "   "
    fireEvent.change(nameInput, { target: { value: '    ' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const errorMsg = screen.getByText(/Full name is required and cannot be blank/i);
      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveAttribute('role', 'alert');
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('rejects invalid email formats (e.g. test@ or missing domain)', async () => {
    render(<UserSettingsForm />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });

    // AI Mistake Caught: Round 1 allowed "alex@" because it only checked .includes('@')
    fireEvent.change(nameInput, { target: { value: 'Alex Mercer' } });
    fireEvent.change(emailInput, { target: { value: 'alex@' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/Please provide a valid email address/i)
      ).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('disables submit button and sets aria-busy during in-flight submission', async () => {
    let resolveSave: () => void = () => {};
    const onSaveMock = vi.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveSave = resolve;
        })
    );

    render(<UserSettingsForm onSave={onSaveMock} />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'Alex Mercer' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'alex@example.com' },
    });

    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });
    fireEvent.click(submitBtn);

    // Verify button is disabled to prevent duplicate concurrent submissions
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
      expect(submitBtn).toHaveTextContent(/Saving Changes/i);
    });

    // Resolve network request
    resolveSave();

    await waitFor(() => {
      expect(
        screen.getByText(/Settings have been saved successfully/i)

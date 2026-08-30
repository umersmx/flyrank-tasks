# FE-02 Workflow Drill - Round 2 (Precise Spec & Verification)

Branch: `feat/round-2-precise`

## Prompt Used
```text
Task: Implement a robust, accessible User Settings Form in React 19 + TypeScript.
File references:
- task 2/src/types/settings.ts
- task 2/src/utils/validation.ts
- task 2/src/components/UserSettingsForm.tsx
- task 2/src/components/__tests__/UserSettingsForm.test.tsx

Constraints & Specifications:
1. Data Model:
   - fullName: string, required, trimmed, 2-50 chars, reject whitespace-only.
   - email: string, required, RFC 5322 compliant regex, reject invalid domains or trailing @.
   - bio: string, optional, max 160 chars, show real-time character count.
   - role: 'developer' | 'designer' | 'manager' | 'researcher', required.
   - emailNotifications: boolean.
2. Accessibility (WCAG 2.1 AA):
   - All inputs must have explicit <label htmlFor="..."> matching input id.
   - Dynamic error states must link via aria-invalid and aria-describedby="{field}-error".
   - Error messages and success banner must have role="alert" or aria-live="polite".
3. State & Edge Cases:
   - Maintain form state with TypeScript typing.
   - Include submission lifecycle: idle, submitting (disable all inputs and show loading indicator), success (banner), error.
   - Prevent double-submit race conditions while submission is in-flight.
4. Verification:
   - Write comprehensive unit tests in Vitest + React Testing Library.
   - Test: valid submission, whitespace-only rejection, malformed email rejection, submit button disabling during submit.
   - Run tests and ensure all pass.
```

## Verification
- Test command: `npm test`
- Build command: `npm run build`
- All 5 test suites pass: validation checks, WCAG attributes, race-condition button disabling, and submission lifecycle.

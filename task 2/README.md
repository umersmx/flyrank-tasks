# FE-02 Workflow Drill - Round 1 (Vague Prompt)

Branch: `feat/round-1-vague`

## Prompt Used
```text
make a user settings form with validation
```

## Review & Audit
- **Validation**: Ad-hoc checks in submit handler. Whitespace strings `"   "` bypass name check. Email only checks `includes('@')`.
- **Accessibility**: Missing `<label htmlFor>` association, no `aria-invalid`, no screen-reader alerts.
- **Race conditions**: No in-flight submit guard; multiple clicks trigger multiple submits.
- **Tests**: None.

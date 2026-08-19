import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce hook', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('updates debounced value only after specified delay', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebounce(val, delay),
      { initialProps: { val: 'first', delay: 300 } }
    );

    expect(result.current).toBe('first');

    // Trigger update
    rerender({ val: 'second', delay: 300 });
    expect(result.current).toBe('first'); // still old value

    // Fast-forward partially
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('first');

    // Fast-forward past delay
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('second');

    vi.useRealTimers();
  });
});

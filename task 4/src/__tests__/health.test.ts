import { describe, it, expect } from 'vitest';
import { GET } from '../app/api/health/route';

describe('Health Route Handler (/api/health)', () => {
  it('returns status 200 with operational telemetry', async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.status).toBe('healthy');

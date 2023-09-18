import { describe, expect, it } from 'vitest';
import { createTestDocassembleClient } from './context/test';

describe('docassemble api client', () => {
  const client = createTestDocassembleClient();

  it('returns a list of interviews', async () => {
    const interviews = await client.getInterviews();
    expect(interviews).not.toEqual(null);
  });
});

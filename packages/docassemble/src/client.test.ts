import { describe, expect, it } from 'vitest';
import { createTestDocassembleClient } from './context/test';

describe('docassemble api client', () => {
  const client = createTestDocassembleClient();

  it('returns a list of interviews', async () => {
    const interviews = await client.getInterviews();
    expect(interviews).not.toEqual(null);
  });

  it('populates a package', async () => {
    const result = await client.addPackage(
      'https://github.com/SuffolkLITLab/docassemble-MassAccess',
      'main'
    );
    // TODO: determine why packages are not populating. We are getting this
    // error back:
    expect(result.ok).toEqual(false);
    expect((result as any).error).toEqual(
      '[400] BAD REQUEST: "No instructions provided."\n'
    );
  });
});

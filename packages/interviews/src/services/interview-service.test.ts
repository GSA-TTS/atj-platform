import { describe, expect, it } from 'vitest';

import { InterviewService } from './interview-service';

describe('interview service', () => {
  const interviewService = new InterviewService();

  it('returns errors for missing required fields', async () => {
    const result = await interviewService.validateInterview({
      address: '123 N. Main St.',
      city: 'Small Town',
      //state: 'WI',
      postalCode: '00000',
    });
    expect(result).toEqual([
      {
        instancePath: '',
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'state' },
        message: "must have required property 'state'",
      },
    ]);
  });
});

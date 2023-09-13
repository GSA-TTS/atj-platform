import { describe, expect, it } from 'vitest';

import { createInterview } from './interview';

const interviewSchema = {
  schema: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    type: 'object',
    properties: {
      address: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      postalCode: { type: 'string', pattern: '^\\d{5}(?:[-\\s]\\d{4})?$' },
    },
    required: ['address', 'city', 'state', 'postalCode'],
    additionalProperties: false,
  },
  options: {
    title: 'Restraining order interview',
  },
};

describe('interview', () => {
  it('initializes', () => {
    const interview = createInterview(interviewSchema);
    expect(interview).toBeDefined();
  });

  it('initializes', () => {
    const interview = createInterview(interviewSchema);
    expect(interview).toBeDefined();
  });
});

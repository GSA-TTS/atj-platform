import { describe, expect, it } from 'vitest';

import { InterviewService } from './interview-service';

describe('interview service', () => {
  const interviewService = new InterviewService();

  it('works', () => {
    const response = interviewService.helloWorld();
    expect(response).toEqual('Hello, world!');
  });
});

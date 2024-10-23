import { describe, expect, it } from 'vitest';
import { SubmissionRegistry } from './submission';

describe('SubmissionRegistry', () => {
  it('should register a submit handler once', () => {
    const registry = new SubmissionRegistry();
    const handler1 = () => {};
    const handler2 = () => {};

    registry.registerHandler('handler1', handler1);
    registry.registerHandler('handler2', handler2);

    expect(() => registry.registerHandler('handler1', () => {})).toThrow(
      'Submission handler with id handler1 already exists'
    );
    expect(registry.getHandler('handler1')).toEqual({
      success: true,
      data: handler1,
    });
    expect(registry.getHandler('handler2')).toEqual({
      success: true,
      data: handler2,
    });
    expect(registry.getHandler('handler3')).toEqual({
      success: false,
      error: 'Submission handler with id handler3 does not exist',
    });
  });
});

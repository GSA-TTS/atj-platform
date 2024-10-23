import { type Result, failure, success } from '@atj/common';

type SubmitHandler = () => void;

export class SubmissionRegistry {
  private handlers: Record<string, SubmitHandler> = {};

  registerHandler(handlerId: string, handler: SubmitHandler) {
    if (handlerId in this.handlers) {
      throw new Error(`Submission handler with id ${handlerId} already exists`);
    }
    this.handlers[handlerId] = handler;
  }

  getHandler(handlerId: string): Result<SubmitHandler> {
    if (!(handlerId in this.handlers)) {
      return failure(`Submission handler with id ${handlerId} does not exist`);
    }
    return success(this.handlers[handlerId]);
  }
}

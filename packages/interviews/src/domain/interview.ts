import { InterviewSchema } from './schema';

export const createInterview = (interview: InterviewSchema) => {
  return {
    interview,
  };
};

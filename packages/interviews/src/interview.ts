import { type QuestionMap } from './question';

export type Interview = Readonly<{
  title: string;
  description: string;
  questions: QuestionMap;
}>;

export const sampleInterview: Interview = {
  title: 'Silly nonsense',
  description:
    'This interview helps us wire up a foundation for guided interviews',
  questions: {
    'C0A62964-90A6-4CEE-8C03-9597ECABD21B': {
      id: 'C0A62964-90A6-4CEE-8C03-9597ECABD21B',
      fact: {
        type: 'boolean',
        initial: null,
      },
      prompt: {
        title: 'Do you like true or false?',
        description: 'If you like true, enter "yes"; otherwise, enter "no".',
        placeholder: '[yes] or [no]',
      },
      next: 'E78F3B5D-4D32-4441-9B5F-55A3AE494892',
    },
    'E78F3B5D-4D32-4441-9B5F-55A3AE494892': {
      id: 'E78F3B5D-4D32-4441-9B5F-55A3AE494892',
      fact: {
        type: 'text',
        initial: '',
      },
      prompt: {
        title: 'Tell us your favorite color.',
        description: 'Enter red, green, or blue.',
        placeholder: 'favorite color',
      },
    },
  },
};

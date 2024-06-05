import {
  type CreatePrompt,
  type PageProps,
  createPromptForPattern,
  getPattern,
} from '../..';

import { type PagePattern } from './config';

export const createPrompt: CreatePrompt<PagePattern> = (
  config,
  session,
  pattern,
  options
) => {
  // :TODO: There's an edge case with page saving where it's being saved with an empty string value. Figure out root cause.
  const children = pattern.data.patterns
    .filter((patternId: string) => patternId.length > 0)
    .map((patternId: string) => {
      const childPattern = getPattern(session.form, patternId);
      return createPromptForPattern(config, session, childPattern, options);
    });
  return {
    props: {
      _patternId: pattern.id,
      type: 'page',
      title: pattern.data.title,
    } satisfies PageProps,
    children,
  };
};

import {
  type CreatePrompt,
  type PageProps,
  createPromptForPattern,
  getPattern,
} from '../..';

import { PagePattern } from './config';

export const createPrompt: CreatePrompt<PagePattern> = (
  config,
  session,
  pattern,
  options
) => {
  const children = pattern.data.patterns.map((patternId: string) => {
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

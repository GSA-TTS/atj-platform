import { type FieldsetPattern } from '.';
import {
  type CreatePrompt,
  type FieldsetProps,
  createPromptForPattern,
  getPattern,
} from '../..';

export const createPrompt: CreatePrompt<FieldsetPattern> = (
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
      type: 'fieldset',
      legend: pattern.data.legend,
    } satisfies FieldsetProps,
    children,
  };
};

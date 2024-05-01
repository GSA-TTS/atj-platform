import * as z from 'zod';

import { Result } from '@atj/common';

import { type RadioGroupProps } from '../components';
import { type Pattern, type PatternConfig, validatePattern } from '../pattern';
import { getFormSessionValue } from '../session';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  label: z.string(),
  options: z
    .object({
      id: z.string().regex(/^[^\s]+$/),
      label: z.string(),
    })
    .array(),
});
export type RadioGroupPattern = Pattern<z.infer<typeof configSchema>>;

const PatternOutput = z.string();
type PatternOutput = z.infer<typeof PatternOutput>;

export const radioGroupConfig: PatternConfig<RadioGroupPattern, PatternOutput> =
  {
    displayName: 'Radio group',
    initial: {
      label: 'Radio group label',
      options: [
        { id: 'option-1', label: 'Option 1' },
        { id: 'option-1', label: 'Option 2' },
      ],
    },
    parseUserInput: (pattern, input) => {
      return extractOptionId(pattern.id, input);
    },
    parseConfigData: obj => {
      const result = safeZodParse(configSchema, obj);
      if (!result.success) {
        console.error(result.error);
      }
      return result;
    },
    getChildren() {
      return [];
    },
    createPrompt(_, session, pattern, options) {
      const extraAttributes: Record<string, any> = {};
      const sessionValue = getFormSessionValue(session, pattern.id);
      if (options.validate) {
        const isValidResult = validatePattern(
          radioGroupConfig,
          pattern,
          sessionValue
        );
        if (!isValidResult.success) {
          extraAttributes['error'] = isValidResult.error;
        }
      }
      return {
        props: {
          _patternId: pattern.id,
          type: 'radio-group',
          legend: pattern.data.label,
          options: pattern.data.options.map(option => {
            const optionId = createId(pattern.id, option.id);
            return {
              id: optionId,
              name: pattern.id,
              label: option.label,
              defaultChecked: sessionValue === optionId,
            };
          }),
          ...extraAttributes,
        } as RadioGroupProps,
        children: [],
      };
    },
  };

const createId = (groupId: string, optionId: string) =>
  `${groupId}-${optionId}`;

export const extractOptionId = (
  groupId: string,
  inputId: unknown
): Result<string> => {
  if (typeof inputId !== 'string') {
    return {
      success: false,
      error: 'invalid data',
    };
  }
  if (!inputId.startsWith(groupId)) {
    return {
      success: false,
      error: `invalid id: ${inputId}`,
    };
  }
  return {
    success: true,
    data: inputId.slice(groupId.length + 1),
  };
};

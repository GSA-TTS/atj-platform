import * as z from 'zod';

import { type Pattern, type PatternConfig, validatePattern } from '../pattern';
import { type TextInputProps } from '../components';
import { getFormSessionValue } from '../session';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  label: z.string(),
  initial: z.string(),
  required: z.boolean(),
  maxLength: z.coerce.number(),
});
export type InputPattern = Pattern<z.infer<typeof configSchema>>;

const createSchema = (data: InputPattern['data']) =>
  z.string().max(data.maxLength);

type InputPatternOutput = z.infer<ReturnType<typeof createSchema>>;

export const inputConfig: PatternConfig<InputPattern, InputPatternOutput> = {
  displayName: 'Text input',
  initial: {
    label: '',
    initial: '',
    required: true,
    maxLength: 128,
  },
  parseData: (patternData, obj) => {
    return safeZodParse(createSchema(patternData), obj);
  },
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, pattern, options) {
    const extraAttributes: Record<string, any> = {};
    const sessionValue = getFormSessionValue(session, pattern.id);
    if (options.validate) {
      const isValidResult = validatePattern(inputConfig, pattern, sessionValue);
      if (!isValidResult.success) {
        extraAttributes['error'] = isValidResult.error;
      }
    }
    return {
      pattern: {
        _patternId: pattern.id,
        type: 'input',
        inputId: pattern.id,
        value: sessionValue,
        label: pattern.data.label,
        required: pattern.data.required,
        ...extraAttributes,
      } as TextInputProps,
      children: [],
    };
  },
};

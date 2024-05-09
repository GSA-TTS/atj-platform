import * as z from 'zod';

import { type Pattern, type PatternConfig, validatePattern } from '../pattern';
import { type TextInputProps } from '../components';
import { getFormSessionValue } from '../session';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  label: z.string().min(1, 'A field label is required'),
  initial: z.string().optional(),
  required: z.boolean(),
  maxLength: z.coerce.number(),
});
export type InputPattern = Pattern<z.infer<typeof configSchema>>;

const createSchema = (data: InputPattern['data']) => {
  const schema = z.string().max(data.maxLength);
  if (!data.required) {
    return schema;
  }
  return schema.min(1, { message: 'This field is required' });
};

type InputPatternOutput = z.infer<ReturnType<typeof createSchema>>;

export const inputConfig: PatternConfig<InputPattern, InputPatternOutput> = {
  displayName: 'Text input',
  initial: {
    label: 'Field label',
    initial: '',
    required: true,
    maxLength: 128,
  },
  parseUserInput: (pattern, obj) => {
    return safeZodParse(createSchema(pattern['data']), obj);
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
      props: {
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

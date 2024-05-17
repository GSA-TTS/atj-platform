import * as z from 'zod';

import { type Pattern, type PatternConfig, validatePattern } from '../pattern';
import { type TextInputProps } from '../components';
import { getFormSessionValue } from '../session';
import { safeZodParseFormErrors, safeZodParseToFormError } from '../util/zod';
import { en as message } from '@atj/common/src/locales/en/app';

const configSchema = z.object({
  label: z.string().min(1, message.patterns.input.fieldLabelRequired),
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
  displayName: message.patterns.input.displayName,
  initial: {
    label: message.patterns.input.fieldLabel,
    initial: '',
    required: true,
    maxLength: 128,
  },
  parseUserInput: (pattern, obj) => {
    return safeZodParseToFormError(createSchema(pattern['data']), obj);
  },
  parseConfigData: obj => safeZodParseFormErrors(configSchema, obj),
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

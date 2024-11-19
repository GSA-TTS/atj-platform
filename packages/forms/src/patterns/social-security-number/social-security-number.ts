import * as z from 'zod';

import { type SocialSecurityNumberProps } from '../../components.js';
import {
  type Pattern,
  type PatternConfig,
  validatePattern,
} from '../../pattern.js';
import { getFormSessionValue } from '../../session.js';
import {
  safeZodParseFormErrors,
  safeZodParseToFormError,
} from '../../util/zod.js';

const configSchema = z.object({
  label: z.string().min(1),
  required: z.boolean(),
  hint: z.string().optional(),
});

export type SocialSecurityNumberPattern = Pattern<z.infer<typeof configSchema>>;

export type SocialSecurityNumberPatternOutput = z.infer<
  ReturnType<typeof createSSNSchema>
>;

export const createSSNSchema = (data: SocialSecurityNumberPattern['data']) => {
  const ssnSchema = z.string().refine(value => {
    const isValidFormat = /^\d{3}-\d{2}-\d{4}$|^\d{9}$/.test(value);
    const stripped = value.replace(/[^0-9]/g, '');
    return isValidFormat && stripped.length === 9;
  }, 'Social Security Number must contain exactly 9 digits and be formatted as XXX-XX-XXXX or XXXXXXXXX');

  if (!data.required) {
    return ssnSchema.or(z.literal('').optional()).optional();
  }

  return ssnSchema;
};

export const socialSecurityNumberConfig: PatternConfig<
  SocialSecurityNumberPattern,
  SocialSecurityNumberPatternOutput
> = {
  displayName: 'Social Security Number',
  iconPath: 'ssn-icon.svg',
  initial: {
    label: 'Social Security Number',
    required: true,
    hint: 'For example, 555-11-0000',
  },

  parseUserInput: (pattern, inputValue) => {
    const result = safeZodParseToFormError(
      createSSNSchema(pattern.data),
      inputValue
    );
    return result;
  },

  parseConfigData: obj => {
    return safeZodParseFormErrors(configSchema, obj);
  },
  getChildren() {
    return [];
  },

  createPrompt(_, session, pattern, options) {
    const extraAttributes: Record<string, any> = {};
    const sessionValue = getFormSessionValue(session, pattern.id);
    const error = session.data.errors[pattern.id];

    /*
    if (options.validate) {
      const isValidResult = validatePattern(
        socialSecurityNumberConfig,
        pattern,
        sessionValue
      );
      if (!isValidResult.success) {
        extraAttributes['error'] = isValidResult.error;
      }
    }
    */

    return {
      props: {
        _patternId: pattern.id,
        type: 'social-security-number',
        label: pattern.data.label,
        ssnId: pattern.id,
        required: pattern.data.required,
        hint: pattern.data.hint,
        value: sessionValue,
        error,
        ...extraAttributes,
      } as SocialSecurityNumberProps,
      children: [],
    };
  },
};

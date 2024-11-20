import * as z from 'zod';
import { type SocialSecurityNumberProps } from '../../components.js';
import { type Pattern, type PatternConfig } from '../../pattern.js';
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
    const stripped = value.replace(/[^0-9]/g, '');

    const isValidFormat = /^\d{3}-\d{2}-\d{4}$|^\d{9}$/.test(value);

    if (!isValidFormat) {
      return false;
    }

    if (stripped.length !== 9) {
      return false;
    }

    const hasValidPrefix = !(
      stripped.startsWith('9') ||
      stripped.startsWith('666') ||
      stripped.startsWith('000')
    );

    const hasValidMiddle = stripped.slice(3, 5) !== '00';
    const hasValidSuffix = stripped.slice(5) !== '0000';

    return hasValidPrefix && hasValidMiddle && hasValidSuffix;
  }, 'Social Security Number must contain exactly 9 digits, be formatted as XXX-XX-XXXX or XXXXXXXXX, and meet SSA issuance criteria');

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

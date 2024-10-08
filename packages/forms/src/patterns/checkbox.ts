import * as z from 'zod';

import {
  type Pattern,
  type PatternConfig,
  validatePattern,
} from '../pattern.js';
import { type CheckboxProps } from '../components.js';
import { getFormSessionValue } from '../session.js';
import {
  safeZodParseFormErrors,
  safeZodParseToFormError,
} from '../util/zod.js';

const configSchema = z.object({
  label: z.string().min(1),
  defaultChecked: z.boolean(),
});
export type CheckboxPattern = Pattern<z.infer<typeof configSchema>>;

const PatternOutput = z.boolean();
type PatternOutput = z.infer<typeof PatternOutput>;

export const checkboxConfig: PatternConfig<CheckboxPattern, PatternOutput> = {
  displayName: 'Checkbox',
  iconPath: 'checkbox-icon.svg',
  initial: {
    label: 'Checkbox label',
    defaultChecked: false,
  },
  parseUserInput: (_, obj) => {
    return safeZodParseToFormError(PatternOutput, obj);
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
    //const sessionError = getFormSessionError(session, pattern.id);
    if (options.validate) {
      const isValidResult = validatePattern(
        checkboxConfig,
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
        type: 'checkbox',
        id: pattern.id,
        name: pattern.id,
        value: sessionValue,
        label: pattern.data.label,
        defaultChecked: pattern.data.defaultChecked,
        ...extraAttributes,
      } as CheckboxProps,
      children: [],
    };
  },
};

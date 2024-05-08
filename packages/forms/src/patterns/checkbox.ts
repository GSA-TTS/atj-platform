import * as z from 'zod';

import { type Pattern, type PatternConfig, validatePattern } from '../pattern';
import { type CheckboxProps } from '../components';
import { getFormSessionValue } from '../session';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  label: z.string(),
  defaultChecked: z.boolean(),
});
export type CheckboxPattern = Pattern<z.infer<typeof configSchema>>;

const PatternOutput = z.boolean();
type PatternOutput = z.infer<typeof PatternOutput>;

export const checkboxConfig: PatternConfig<CheckboxPattern, PatternOutput> = {
  displayName: 'Checkbox',
  initial: {
    label: 'Checkbox label',
    defaultChecked: false,
  },
  parseUserInput: (_, obj) => {
    return safeZodParse(PatternOutput, obj);
  },
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, pattern, options) {
    const extraAttributes: Record<string, any> = {};
    const sessionValue = getFormSessionValue(session, pattern.id);
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

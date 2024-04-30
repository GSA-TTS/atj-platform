import * as z from 'zod';

import { type Pattern, type PatternConfig, validatePattern } from '../pattern';
import { type RadioGroupProps } from '../components';
import { getFormSessionValue } from '../session';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  label: z.string(),
  options: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array(),
});
export type RadioGroupPattern = Pattern<z.infer<typeof configSchema>>;

const PatternOutput = z.boolean();
type PatternOutput = z.infer<typeof PatternOutput>;

const parseJSONString = (obj: any) => {
  if (typeof obj === 'string') {
    try {
      return JSON.parse(obj);
    } catch (error) {
      return null;
    }
  }
};

export const radioGroupConfig: PatternConfig<RadioGroupPattern, PatternOutput> =
  {
    displayName: 'Radio group',
    initial: {
      label: 'Radio group label',
      // TODO: for now, have some default options, so we can visualize what
      // radio groups look like.
      // replace this with an empty array once we get a proper UI.
      options: [
        { id: '1', label: 'Option 1' },
        { id: '2', label: 'Option 2' },
      ],
    },
    parseData: (_, obj) => {
      return safeZodParse(PatternOutput, obj);
    },
    parseConfigData: obj => {
      const result = safeZodParse(configSchema, {
        ...(obj as any),
        options: parseJSONString((obj as any).options),
      });
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
          options: pattern.data.options.map(option => ({
            id: option.id,
            name: option.id,
            label: option.label,
            defaultChecked: sessionValue === option.id,
          })),
          ...extraAttributes,
        } as RadioGroupProps,
        children: [],
      };
    },
  };

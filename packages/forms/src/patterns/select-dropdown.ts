import * as z from 'zod';

import { type SelectDropdownProps } from '../components.js';
import {
  type Pattern,
  type PatternConfig,
  validatePattern,
} from '../pattern.js';
import { getFormSessionValue } from '../session.js';
import { safeZodParseFormErrors } from '../util/zod.js';

const configSchema = z.object({
  label: z.string().min(1),
  required: z.boolean(),
  options: z
    .object({
      value: z
        .string()
        .regex(/^[A-Za-z][A-Za-z0-9\-_:.]*$/, 'Invalid Option Value'),
      label: z.string().min(1),
    })
    .array(),
});
export type SelectDropdownPattern = Pattern<z.infer<typeof configSchema>>;

const PatternOutput = z.string();
type PatternOutput = z.infer<typeof PatternOutput>;

export const selectDropdownConfig: PatternConfig<
  SelectDropdownPattern,
  PatternOutput
> = {
  displayName: 'Select Dropdown',
  iconPath: 'dropdown-icon.svg',
  initial: {
    label: 'Select-dropdown-label',
    required: true,
    options: [
      { value: 'value1', label: '-Select-' },
      { value: 'value2', label: 'Option-1' },
      { value: 'value3', label: 'Option-2' },
      { value: 'value4', label: 'Option-3' },
    ],
  },

  parseUserInput: (pattern, input: unknown) => {
    console.log('TEST parseUserInput');

    // FIXME: Not sure why we're sometimes getting a string here, and sometimes
    // the expected object. Workaround, by accepting both.
    if (typeof input === 'string') {
      return {
        success: true,
        data: input,
      };
    }
    // const optionId = getSelectedOption(pattern, input);
    return {
      success: true,
      data: '',
    };
    /*
      if (optionId) {
        return {
          success: true,
          data: optionId,
        };
      }
      return {
        success: false,
        error: {
          type: 'custom',
          message: `No option selected for radio group: ${pattern.id}. Input: ${input}`,
        },
      };
      */
  },

  parseConfigData: obj => {
    const result = safeZodParseFormErrors(configSchema, obj);
    console.log('TEST ParseConfigData', result);

    return result;
  },
  getChildren() {
    return [];
  },

  // QUESTION: where are we using this?
  createPrompt(_, session, pattern, options) {
    const extraAttributes: Record<string, any> = {};
    const sessionValue = getFormSessionValue(session, pattern.id);
    if (options.validate) {
      const isValidResult = validatePattern(
        selectDropdownConfig,
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
        type: 'select-dropdown',
        label: pattern.data.label,
        selectId: pattern.id,
        options: pattern.data.options.map(option => {
          return {
            value: option.value,
            label: option.label,
          };
        }),
        required: pattern.data.required,
        ...extraAttributes,
      } as SelectDropdownProps,
      children: [],
    };
  },
};

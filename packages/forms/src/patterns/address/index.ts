import * as z from 'zod';

import {
  validatePattern,
  type Pattern,
  type PatternConfig,
} from '../../pattern';
import {
  type FieldsetProps,
  createPromptForPattern,
  TextInputProps,
} from '../../components';
import { safeZodParse } from '../../util/zod';
import { stateTerritoryOrMilitaryPostAbbreviations } from './jurisdictions';
import { getFormSessionValue } from '../../session';

export type AddressPattern = Pattern<{}>;

const AddressSchema = z.object({
  steetAddress: z.string().max(128),
  steetAddress2: z.string().max(128).optional(),
  city: z.string().max(64),
  stateTerritoryOrMilitaryPost: stateTerritoryOrMilitaryPostAbbreviations,
  zipCode: z.string().max(10),
  urbanizationCode: z.string().max(128).optional(),
  //googlePlusCode: z.string().max(8),
});

type AddressPatternOutput = z.infer<typeof AddressSchema>;

const configSchema = z.object({});

export const addressConfig: PatternConfig<
  AddressPattern,
  AddressPatternOutput
> = {
  displayName: 'Physical address',
  initial: {
    patterns: [],
  },
  parseData: (_, obj) => {
    return safeZodParse(AddressSchema, obj);
  },
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren(pattern, patterns) {
    return [];
  },
  createPrompt(config, session, pattern, options) {
    const extraAttributes: Record<string, any> = {};
    const sessionValue = getFormSessionValue(session, pattern.id);
    if (options.validate) {
      const isValidResult = validatePattern(
        addressConfig,
        pattern,
        sessionValue
      );
      if (!isValidResult.success) {
        extraAttributes['error'] = isValidResult.error;
      }
    }
    const children = [
      {
        pattern: {
          _patternId: pattern.id,
          type: 'input',
          inputId: pattern.id,
          value: sessionValue,
          label: 'pattern.data.label',
          required: true,
          ...extraAttributes,
        } as TextInputProps,
        children: [],
      },
    ];
    return {
      pattern: {
        _children: children,
        _patternId: pattern.id,
        type: 'sequence',
      },
      children,
    };
  },
};

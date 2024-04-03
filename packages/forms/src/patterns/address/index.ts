import * as z from 'zod';

import {
  validatePattern,
  type Pattern,
  type PatternConfig,
} from '../../pattern';
import { PatternProps } from '../../components';
import { safeZodParse } from '../../util/zod';
import {
  stateTerritoryOrMilitaryPostAbbreviations,
  stateTerritoryOrMilitaryPostList,
} from './jurisdictions';
import { getFormSessionValue } from '../../session';

export type AddressPattern = Pattern<{}>;

export type AddressComponentProps = PatternProps<{
  childProps: {
    streetAddress: {
      inputId: string;
      value: string;
      label: string;
      required: boolean;
      error?: string;
    };
    streetAddress2: {
      inputId: string;
      value: string;
      label: string;
      required: boolean;
      error?: string;
    };
    city: {
      inputId: string;
      value: string;
      label: string;
      required: boolean;
      error?: string;
    };
    stateTerritoryOrMilitaryPost: {
      inputId: string;
      value: string;
      label: string;
      required: boolean;
      options: typeof stateTerritoryOrMilitaryPostList;
      error?: string;
    };
    zipCode: {
      inputId: string;
      value: string;
      label: string;
      required: boolean;
      error?: string;
    };
    urbanizationCode: {
      inputId: string;
      value: string;
      label: string;
      required: boolean;
      error?: string;
    };
  };
}>;

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
    const sessionValue = getFormSessionValue(session, pattern.id);
    const result = options.validate
      ? AddressSchema.safeParse(sessionValue)
      : null;
    return {
      pattern: {
        _patternId: pattern.id,
        type: 'address',
        childProps: {
          streetAddress: {
            inputId: `${pattern.id}.streetAddress`,
            value: sessionValue?.streetAddress,
            label: 'Street address',
            required: true,
            error:
              !result || result?.success
                ? undefined
                : result.error.formErrors.fieldErrors.steetAddress?.join(', '),
          },
          streetAddress2: {
            inputId: `${pattern.id}.streetAddress2`,
            value: sessionValue?.streetAddress2,
            label: 'Street address line 2',
            required: false,
            error:
              !result || result?.success
                ? undefined
                : result.error.formErrors.fieldErrors.steetAddress2?.join(', '),
          },
          city: {
            inputId: `${pattern.id}.city`,
            value: sessionValue?.city,
            label: 'City',
            required: true,
            error:
              !result || result?.success
                ? undefined
                : result.error.formErrors.fieldErrors.city?.join(', '),
          },
          stateTerritoryOrMilitaryPost: {
            inputId: `${pattern.id}.city`,
            value: sessionValue?.stateTerritoryOrMilitaryPost,
            label: 'State, territory, or military post',
            required: true,
            options: stateTerritoryOrMilitaryPostList,
            error:
              !result || result?.success
                ? undefined
                : result.error.formErrors.fieldErrors.stateTerritoryOrMilitaryPost?.join(
                    ', '
                  ),
          },
          zipCode: {
            inputId: `${pattern.id}.zipCode`,
            value: sessionValue?.zipCode,
            label: 'ZIP code',
            required: true,
            error:
              !result || result?.success
                ? undefined
                : result.error.formErrors.fieldErrors.zipCode?.join(', '),
          },
          urbanizationCode: {
            inputId: `${pattern.id}.urbanizationCode`,
            value: sessionValue?.urbanizationCode,
            label: 'Urbanization (Puerto Rico only)',
            required: false,
            error:
              !result || result?.success
                ? undefined
                : result.error.formErrors.fieldErrors.urbanizationCode?.join(
                    ', '
                  ),
          },
        },
      } satisfies AddressComponentProps,
      children: [],
    };
  },
};

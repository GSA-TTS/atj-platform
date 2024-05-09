import { useFormContext } from 'react-hook-form';

import { type Pattern, type PatternId, type PatternMap } from '@atj/forms';

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? T[K] extends Array<infer U>
          ? U extends object
            ? `${K & string}` | `${K & string}.${NestedKeys<U>}`
            : `${K & string}`
          : `${K & string}` | `${K & string}.${NestedKeys<T[K]>}`
        : never;
    }[keyof T]
  : never;

export const usePatternEditFormContext = <T extends Pattern>(
  patternId: PatternId
) => {
  const { formState, getFieldState, register } = useFormContext<PatternMap>();
  return {
    errors: formState.errors,
    fieldId: (path: NestedKeys<T['data']>) => `${patternId}.${path}`,
    register: (path: NestedKeys<T['data']>) => register(`${patternId}.${path}`),
    getFieldState: (path: NestedKeys<T['data']>) =>
      getFieldState(`${patternId}.${path}`, formState),
  };
};

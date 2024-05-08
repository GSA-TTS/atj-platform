import { useFormContext } from 'react-hook-form';

import { type Pattern, type PatternId, type PatternMap } from '@atj/forms';

type NestedKeys<T> = (T extends object
  ? { [K in keyof T]-?: `${K & string}` | `${K & string}.${NestedKeys<T[K]>}` }
  : never)[keyof T];

export const usePatternEditFormContext = <T extends Pattern>(
  patternId: PatternId
) => {
  const { formState, getFieldState, register } = useFormContext<PatternMap>();
  return {
    errors: formState.errors,
    fieldId: (path: NestedKeys<T>) => `${patternId}.${path}`,
    register: (path: NestedKeys<T>) => register(`${patternId}.${path}`),
    getFieldState: (path: NestedKeys<T>) =>
      getFieldState(`${patternId}.${path}`, formState),
  };
};

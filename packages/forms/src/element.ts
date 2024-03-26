import { type Result } from '@atj/common';
import { type FormDefinition } from '..';

import { type CreatePrompt } from './pattern';

export type Pattern<T = any, C = any> = {
  type: string;
  id: PatternId;
  data: C;
  default: T;
  required: boolean;
};

export type PatternId = string;
export type PatternValue<T extends Pattern = Pattern> = T['default'];
export type PatternValueMap = Record<PatternId, PatternValue>;
export type PatternMap = Record<PatternId, Pattern>;
export type GetPattern = (form: FormDefinition, id: PatternId) => Pattern;

export type ParsePatternData<T extends Pattern = Pattern> = (
  elementData: T['data'],
  obj: string
) => Result<T['data']>;

export type ParsePatternConfigData<T extends Pattern = Pattern> = (
  elementData: T['data']
) => Result<T['data']>;

export const getPattern: GetPattern = (form, elementId) => {
  return form.elements[elementId];
};

export type PatternConfig<ThisPattern extends Pattern> = {
  acceptsInput: boolean;
  initial: ThisPattern['data'];
  parseData: ParsePatternData<ThisPattern>;
  parseConfigData: ParsePatternConfigData<ThisPattern>;
  getChildren: (
    element: ThisPattern,
    elements: Record<PatternId, Pattern>
  ) => Pattern[];
  createPrompt: CreatePrompt<ThisPattern>;
};
export type FormConfig<T extends Pattern = Pattern> = {
  elements: Record<string, PatternConfig<T>>;
};

export type ConfigElements<Config extends FormConfig> = ReturnType<
  Config['elements'][keyof Config['elements']]['parseData']
>;

export const getPatternMap = (elements: Pattern[]) => {
  return Object.fromEntries(
    elements.map(element => {
      return [element.id, element];
    })
  );
};

export const getPatterns = (form: FormDefinition, elementIds: PatternId[]) => {
  return elementIds.map(elementId => getPattern(form, elementId));
};

export const getPatternConfig = (
  config: FormConfig,
  elementType: Pattern['type']
) => {
  return config.elements[elementType];
};

export const validateElement = (
  elementConfig: PatternConfig<Pattern>,
  element: Pattern,
  value: any
): Result<Pattern['data']> => {
  if (!elementConfig.acceptsInput) {
    return {
      success: true,
      data: value,
    };
  }
  const parseResult = elementConfig.parseData(element, value);
  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error,
    };
  }
  if (element.data.required && !parseResult.data) {
    return {
      success: false,
      error: 'Required value not provided.',
    };
  }
  return {
    success: true,
    data: parseResult.data,
  };
};

export const getFirstPattern = (
  config: FormConfig,
  form: FormDefinition,
  element?: Pattern
): Pattern => {
  if (!element) {
    element = form.elements[form.root];
  }
  const elemConfig = getPatternConfig(config, element.type);
  const children = elemConfig.getChildren(element, form.elements);
  if (children?.length === 0) {
    return element;
  }
  return getFirstPattern(config, form, children[0]);
};

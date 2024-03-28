import { type Result } from '@atj/common';
import { updatePattern, type Blueprint } from '..';

import { type CreatePrompt } from './components';

export type Pattern<T = any, C = any> = {
  type: string;
  id: PatternId;
  data: C;
  initial: T;
};

export type PatternId = string;
export type PatternValue<T extends Pattern = Pattern> = T['initial'];
export type PatternValueMap = Record<PatternId, PatternValue>;
export type PatternMap = Record<PatternId, Pattern>;
export type GetPattern = (form: Blueprint, id: PatternId) => Pattern;

export type ParsePatternData<T extends Pattern = Pattern> = (
  patternData: T['data'],
  obj: string
) => Result<T['data']>;

export type ParsePatternConfigData<T extends Pattern = Pattern> = (
  patternData: T['data']
) => Result<T['data']>;

export const getPattern: GetPattern = (form, patternId) => {
  return form.patterns[patternId];
};

export type PatternConfig<ThisPattern extends Pattern> = {
  displayName: string;
  acceptsInput: boolean;
  initial: ThisPattern['data'];
  parseData: ParsePatternData<ThisPattern>;
  parseConfigData: ParsePatternConfigData<ThisPattern>;
  getChildren: (
    pattern: ThisPattern,
    patterns: Record<PatternId, Pattern>
  ) => Pattern[];
  createPrompt: CreatePrompt<ThisPattern>;
};
export type FormConfig<T extends Pattern = Pattern> = {
  patterns: Record<string, PatternConfig<T>>;
};

export type ConfigPatterns<Config extends FormConfig> = ReturnType<
  Config['patterns'][keyof Config['patterns']]['parseData']
>;

export const getPatternMap = (patterns: Pattern[]) => {
  return Object.fromEntries(
    patterns.map(pattern => {
      return [pattern.id, pattern];
    })
  );
};

export const getPatternConfig = (
  config: FormConfig,
  elementType: Pattern['type']
) => {
  return config.patterns[elementType];
};

export const validatePattern = (
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
  form: Blueprint,
  pattern?: Pattern
): Pattern => {
  if (!pattern) {
    pattern = form.patterns[form.root];
  }
  const elemConfig = getPatternConfig(config, pattern.type);
  const children = elemConfig.getChildren(pattern, form.patterns);
  if (children?.length === 0) {
    return pattern;
  }
  return getFirstPattern(config, form, children[0]);
};

export const updatePatternFromFormData = (
  config: FormConfig,
  form: Blueprint,
  pattern: Pattern,
  formData: PatternMap
) => {
  const elementConfig = getPatternConfig(config, pattern.type);
  const data = formData[pattern.id].data;
  const result = elementConfig.parseConfigData(data);
  if (!result.success) {
    return;
  }
  const updatedForm = updatePattern(form, {
    ...pattern,
    data: result.data,
  });
  return updatedForm;
};

const generatePatternId = () => crypto.randomUUID();

export const createPattern = (
  config: FormConfig,
  patternType: string
): Pattern => {
  return {
    id: generatePatternId(),
    type: patternType,
    data: config.patterns[patternType].initial,
    initial: {},
  };
};

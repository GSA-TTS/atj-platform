import { type Result } from '@atj/common';
import { updatePattern, type Blueprint } from '..';

import { type CreatePrompt } from './components';

export type Pattern<C = any> = {
  type: string;
  id: PatternId;
  data: C;
};

export type PatternId = string;
export type PatternValue<T extends Pattern = Pattern> = any;
export type PatternValueMap = Record<PatternId, PatternValue>;
export type PatternMap = Record<PatternId, Pattern>;
export type GetPattern = (form: Blueprint, id: PatternId) => Pattern;

type ParsePatternData<PatternConfigData, PatternOutput> = (
  patternData: PatternConfigData,
  obj: unknown
) => Result<PatternOutput>;

type ParsePatternConfigData<PatternConfigData> = (
  patternData: unknown
) => Result<PatternConfigData>;

export const getPattern: GetPattern = (form, patternId) => {
  return form.patterns[patternId];
};

export type PatternConfig<
  ThisPattern extends Pattern = Pattern,
  PatternOutput = unknown,
> = {
  displayName: string;
  initial: ThisPattern['data'];
  parseData?: ParsePatternData<ThisPattern['data'], PatternOutput>;
  parseConfigData: ParsePatternConfigData<ThisPattern['data']>;
  getChildren: (
    pattern: ThisPattern,
    patterns: Record<PatternId, Pattern>
  ) => Pattern[];
  createPrompt: CreatePrompt<ThisPattern>;
};

export type FormConfig<T extends Pattern = Pattern, PatternOutput = unknown> = {
  patterns: Record<string, PatternConfig<T, PatternOutput>>;
};

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
  patternConfig: PatternConfig,
  pattern: Pattern,
  value: any
): Result<Pattern['data']> => {
  if (!patternConfig.parseData) {
    return {
      success: true,
      data: value,
    };
  }
  const parseResult = patternConfig.parseData(pattern, value);
  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error,
    };
  }
  if (pattern.data.required && !parseResult.data) {
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
  };
};

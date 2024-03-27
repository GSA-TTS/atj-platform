import { type SequencePattern } from './patterns/sequence';
import { type DocumentFieldMap } from './documents';
import {
  type FormConfig,
  type Pattern,
  type PatternId,
  type PatternMap,
  getPatternMap,
  getPatternConfig,
} from './pattern';

export * from './builder';
export * from './components';
export * from './config';
export * from './documents';
export * from './pattern';
export * from './response';
export * from './session';

export type Blueprint = {
  summary: FormSummary;
  root: PatternId;
  patterns: PatternMap;
  outputs: FormOutput[];
};

export const nullBlueprint: Blueprint = {
  summary: {
    title: '',
    description: '',
  },
  root: 'root',
  patterns: {
    root: {
      type: 'sequence',
      id: 'root',
      data: {
        patterns: [],
      },
      initial: {
        patterns: [],
      },
    },
  },
  outputs: [],
};

export type FormSummary = {
  title: string;
  description: string;
};

export type FormOutput = {
  data: Uint8Array;
  path: string;
  fields: DocumentFieldMap;
  formFields: Record<string, string>;
};

export const createForm = (
  summary: FormSummary,
  initial: {
    patterns: Pattern[];
    root: PatternId;
  } = {
    patterns: [
      {
        id: 'root',
        type: 'sequence',
        data: {
          patterns: [],
        },
        initial: {
          patterns: [],
        },
      } satisfies SequencePattern,
    ],
    root: 'root',
  }
): Blueprint => {
  return {
    summary,
    root: initial.root,
    patterns: getPatternMap(initial.patterns),
    outputs: [],
  };
};

export const getRootPattern = (form: Blueprint) => {
  return form.patterns[form.root];
};

/*
export const updateForm = (context: Session, id: PatternId, value: any) => {
  if (!(id in context.form.patterns)) {
    console.error(`Pattern "${id}" does not exist on form.`);
    return context;
  }
  const nextForm = addValue(context, id, value);
  const pattern = context.form.patterns[id];
  if (pattern.type === 'input') {
    if (pattern.data.required && !value) {
      return addError(nextForm, id, 'Required value not provided.');
    }
  }
  return nextForm;
};

const addValue = <T extends Pattern = Pattern>(
  form: FormSession,
  id: PatternId,
  value: PatternValue<T>
): FormSession => ({
  ...form,
  data: {
    ...form.data,
    values: {
      ...form.data.values,
      [id]: value,
    },
  },
});

const addError = (
  session: FormSession,
  id: PatternId,
  error: string
): FormSession => ({
  ...session,
  data: {
    ...session.data,
    errors: {
      ...session.data.errors,
      [id]: error,
    },
  },
});
*/

export const addPatternMap = (
  form: Blueprint,
  patterns: PatternMap,
  root?: PatternId
) => {
  return {
    ...form,
    patterns: { ...form.patterns, ...patterns },
    root: root !== undefined ? root : form.root,
  };
};

export const addPatterns = (
  form: Blueprint,
  patterns: Pattern[],
  root?: PatternId
) => {
  const formPatternMap = getPatternMap(patterns);
  return addPatternMap(form, formPatternMap, root);
};

export const replacePatterns = (
  form: Blueprint,
  patterns: Pattern[]
): Blueprint => {
  return {
    ...form,
    patterns: patterns.reduce(
      (acc, pattern) => {
        acc[pattern.id] = pattern;
        return acc;
      },
      {} as Record<PatternId, Pattern>
    ),
  };
};

export const updatePatterns = (
  config: FormConfig,
  form: Blueprint,
  newPatterns: PatternMap
): Blueprint => {
  const root = newPatterns[form.root];
  const targetPatterns: PatternMap = {
    root,
  };
  const resource = config.patterns[root.type as keyof FormConfig];
  const children = resource.getChildren(root, newPatterns);
  targetPatterns[root.id] = root;
  children.forEach(child => (targetPatterns[child.id] = child));
  return {
    ...form,
    patterns: targetPatterns,
  };
};

export const updatePattern = (form: Blueprint, pattern: Pattern): Blueprint => {
  return {
    ...form,
    patterns: {
      ...form.patterns,
      [pattern.id]: pattern,
    },
  };
};

export const addFormOutput = (form: Blueprint, document: FormOutput) => {
  return {
    ...form,
    outputs: [...form.outputs, document],
  };
};

export const getPattern = (form: Blueprint, id: PatternId) => {
  return form.patterns[id];
};

export const updateFormSummary = (form: Blueprint, summary: FormSummary) => {
  return {
    ...form,
    summary,
  };
};

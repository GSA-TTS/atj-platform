import { type SequencePattern } from './patterns/sequence';
import { type DocumentFieldMap } from './documents';
import {
  type FormConfig,
  type Pattern,
  type PatternId,
  type PatternMap,
  getPatternMap,
  removeChildPattern,
  generatePatternId,
} from './pattern';
import { type PagePattern } from './patterns/page/config';
import { type PageSetPattern } from './patterns/page-set/config';
import { FieldsetPattern } from './patterns/fieldset';

export * from './builder';
export * from './components';
export * from './config';
export * from './documents';
export * from './error';
export * from './pattern';
export * from './response';
export * from './session';
export * as service from './service';

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
    } satisfies SequencePattern,
  },
  outputs: [],
};

export const createOnePageBlueprint = (): Blueprint => {
  const page1 = generatePatternId();
  return {
    summary: {
      title: '',
      description: '',
    },
    root: 'root',
    patterns: {
      root: {
        type: 'page-set',
        id: 'root',
        data: {
          pages: [page1],
        },
      } satisfies PageSetPattern,
      [page1]: {
        type: 'page',
        id: page1,
        data: {
          title: 'Page 1',
          patterns: [],
        },
      },
    },
    outputs: [],
  };
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

export const addPatternToPage = (
  bp: Blueprint,
  pagePatternId: PatternId,
  pattern: Pattern
): Blueprint => {
  const pagePattern = bp.patterns[pagePatternId] as PagePattern;
  if (pagePattern.type !== 'page') {
    throw new Error('Pattern is not a page.');
  }
  return {
    ...bp,
    patterns: {
      ...bp.patterns,
      [pagePattern.id]: {
        ...pagePattern,
        data: {
          patterns: [...pagePattern.data.patterns, pattern.id],
        },
      } satisfies SequencePattern,
      [pattern.id]: pattern,
    },
  };
};

export const addPatternToFieldset = (
  bp: Blueprint,
  fieldsetPatternId: PatternId,
  pattern: Pattern
): Blueprint => {
  const fieldsetPattern = bp.patterns[fieldsetPatternId] as FieldsetPattern;
  if (fieldsetPattern.type !== 'fieldset') {
    throw new Error('Pattern is not a page.');
  }
  return {
    ...bp,
    patterns: {
      ...bp.patterns,
      [fieldsetPattern.id]: {
        ...fieldsetPattern,
        data: {
          ...fieldsetPattern.data,
          patterns: [...fieldsetPattern.data.patterns, pattern.id],
        },
      } satisfies FieldsetPattern,
      [pattern.id]: pattern,
    },
  };
};

export const addPageToPageSet = (
  bp: Blueprint,
  pattern: Pattern
): Blueprint => {
  const pageSet = bp.patterns[bp.root] as PageSetPattern;
  if (pageSet.type !== 'page-set') {
    throw new Error('Root pattern is not a page set.');
  }
  return {
    ...bp,
    patterns: {
      ...bp.patterns,
      [pageSet.id]: {
        ...pageSet,
        data: {
          pages: [...pageSet.data.pages, pattern.id],
        },
      } satisfies PageSetPattern,
      [pattern.id]: pattern,
    },
  };
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
    [root.id]: root,
  };
  const patternConfig = config.patterns[root.type];
  const children = patternConfig.getChildren(root, newPatterns);
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

export const addFormOutput = (
  form: Blueprint,
  document: FormOutput
): Blueprint => {
  return {
    ...form,
    outputs: [...form.outputs, document],
  };
};

export const getPattern = <T extends Pattern = Pattern>(
  form: Blueprint,
  id: PatternId
): T => {
  return form.patterns[id] as T;
};

export const updateFormSummary = (
  form: Blueprint,
  summary: FormSummary
): Blueprint => {
  return {
    ...form,
    summary,
  };
};

export const removePatternFromBlueprint = (
  config: FormConfig,
  blueprint: Blueprint,
  id: PatternId
) => {
  // Iterate over each pattern in the blueprint, and remove the target pattern
  // if it is a child.
  const patterns = Object.values(blueprint.patterns).reduce(
    (patterns, pattern) => {
      patterns[pattern.id] = removeChildPattern(config, pattern, id);
      return patterns;
    },
    {} as PatternMap
  );
  // Remove the pattern itself
  delete patterns[id];
  return {
    ...blueprint,
    patterns,
  };
};

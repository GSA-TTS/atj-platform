import {
  type FormConfig,
  type Blueprint,
  type Pattern,
  getPatternConfig,
  validatePattern,
} from '.';
import { SequencePattern } from './patterns/sequence';
import {
  type PatternId,
  type PatternValue,
  type PatternValueMap,
} from './pattern';

type ErrorMap = Record<PatternId, string>;

export type FormSession = {
  data: {
    errors: ErrorMap;
    values: PatternValueMap;
  };
  form: Blueprint;
};

export const nullSession: FormSession = {
  data: {
    errors: {},
    values: {
      root: [],
    },
  },
  form: {
    patterns: {
      root: {
        id: 'root',
        type: 'sequence',
        required: false,
        initial: {
          patterns: [],
        },
        data: {},
      } as SequencePattern,
    },
    root: 'root',
    summary: {
      title: '',
      description: '',
    },
    outputs: [],
  },
};

export const createFormSession = (form: Blueprint): FormSession => {
  return {
    data: {
      errors: {},
      values: Object.fromEntries(
        Object.values(form.patterns).map((pattern, index) => {
          return [pattern.id, form.patterns[pattern.id].data.initial];
        })
      ),
    },
    form,
  };
};

export const getFormSessionValue = (
  session: FormSession,
  patternId: PatternId
) => {
  return session.data.values[patternId];
};

export const updateSessionValue = (
  session: FormSession,
  id: PatternId,
  value: PatternValue
): FormSession => {
  if (!(id in session.form.patterns)) {
    console.error(`Pattern "${id}" does not exist on form.`);
    return session;
  }
  const nextSession = addValue(session, id, value);
  const pattern = session.form.patterns[id];
  if (pattern.type === 'input') {
    if (pattern && !value) {
      return addError(nextSession, id, 'Required value not provided.');
    }
  }
  return nextSession;
};

export const updateSession = (
  session: FormSession,
  values: PatternValueMap,
  errors: ErrorMap
): FormSession => {
  const keysValid =
    Object.keys(values).every(
      patternId => patternId in session.form.patterns
    ) &&
    Object.keys(errors).every(patternId => patternId in session.form.patterns);
  if (!keysValid) {
    throw new Error('invalid pattern reference updating session');
  }
  return {
    ...session,
    data: {
      errors: {
        ...session.data.errors,
        ...errors,
      },
      values: {
        ...session.data.values,
        ...values,
      },
    },
  };
};

export const sessionIsComplete = (config: FormConfig, session: FormSession) => {
  return Object.values(session.form.patterns).every(pattern => {
    const patternConfig = getPatternConfig(config, pattern.type);
    const value = getFormSessionValue(session, pattern.id);
    const isValidResult = validatePattern(patternConfig, pattern, value);
    return isValidResult.success;
  });
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

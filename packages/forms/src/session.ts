import {
  type FormConfig,
  type Blueprint,
  type Pattern,
  getPatternConfig,
  validateElement,
} from '.';
import { SequenceElement } from './config/elements/sequence';
import {
  type PatternId,
  type PatternValue,
  type PatternValueMap,
} from './element';

type ErrorMap = Record<PatternId, string>;

export type Session = {
  data: {
    errors: ErrorMap;
    values: PatternValueMap;
  };
  form: Blueprint;
};

export const nullSession: Session = {
  data: {
    errors: {},
    values: {
      root: [],
    },
  },
  form: {
    elements: {
      root: {
        id: 'root',
        type: 'sequence',
        required: false,
        default: {
          elements: [],
        },
        data: {},
      } as SequenceElement,
    },
    root: 'root',
    summary: {
      title: '',
      description: '',
    },
    outputs: [],
  },
};

export const createSession = (blueprint: Blueprint): Session => {
  return {
    data: {
      errors: {},
      values: Object.fromEntries(
        Object.values(blueprint.elements).map(element => {
          return [element.id, blueprint.elements[element.id].default];
        })
      ),
    },
    form: blueprint,
  };
};

export const getSessionValue = (session: Session, elementId: PatternId) => {
  return session.data.values[elementId];
};

export const updateSessionValue = (
  session: Session,
  id: PatternId,
  value: PatternValue
): Session => {
  if (!(id in session.form.elements)) {
    console.error(`Pattern "${id}" does not exist on form.`);
    return session;
  }
  const nextSession = addValue(session, id, value);
  const element = session.form.elements[id];
  if (element.type === 'input') {
    if (element.required && !value) {
      return addError(nextSession, id, 'Required value not provided.');
    }
  }
  return nextSession;
};

export const updateSession = (
  session: Session,
  values: PatternValueMap,
  errors: ErrorMap
): Session => {
  const keysValid =
    Object.keys(values).every(
      elementId => elementId in session.form.elements
    ) &&
    Object.keys(errors).every(elementId => elementId in session.form.elements);
  if (!keysValid) {
    throw new Error('invalid element reference updating session');
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

export const sessionIsComplete = (config: FormConfig, session: Session) => {
  return Object.values(session.form.elements).every(element => {
    const elementConfig = getPatternConfig(config, element.type);
    const value = getSessionValue(session, element.id);
    const isValidResult = validateElement(elementConfig, element, value);
    return isValidResult.success;
  });
};

const addValue = <T extends Pattern = Pattern>(
  form: Session,
  id: PatternId,
  value: PatternValue<T>
): Session => ({
  ...form,
  data: {
    ...form.data,
    values: {
      ...form.data.values,
      [id]: value,
    },
  },
});

const addError = (session: Session, id: PatternId, error: string): Session => ({
  ...session,
  data: {
    ...session.data,
    errors: {
      ...session.data.errors,
      [id]: error,
    },
  },
});

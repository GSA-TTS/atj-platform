import { getFormElementConfig, type FormDefinition, FormConfig } from '.';
import {
  type FormElementValue,
  type FormElementValueMap,
  type FormElementId,
} from './element';

type ErrorMap = Record<FormElementId, string>;

export type FormSession = {
  data: {
    errors: ErrorMap;
    values: FormElementValueMap;
  };
  form: FormDefinition;
};

export const createFormSession = (form: FormDefinition): FormSession => {
  return {
    data: {
      errors: {},
      values: Object.fromEntries(
        Object.values(form.elements).map(element => {
          return [element.id, form.elements[element.id].default];
        })
      ),
    },
    form,
  };
};

export const getFormSessionValue = (
  session: FormSession,
  elementId: FormElementId
) => {
  return session.data.values[elementId];
};

export const updateSessionValue = (
  session: FormSession,
  id: FormElementId,
  value: any
): FormSession => {
  if (!(id in session.form.elements)) {
    console.error(`FormElement "${id}" does not exist on form.`);
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
  session: FormSession,
  values: FormElementValueMap,
  errors: ErrorMap
): FormSession => {
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

export const sessionIsComplete = (config: FormConfig, session: FormSession) => {
  return Object.values(session.form.elements).every(element => {
    const elementConfig = getFormElementConfig(config, element.type);
    const value = getFormSessionValue(session, element.id);
    return elementConfig.parseData(element, value).success;
  });
};

const addValue = (
  form: FormSession,
  id: FormElementId,
  value: FormElementValue
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
  id: FormElementId,
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

import { type DocumentFieldMap } from './documents';
import {
  getFormElementMap,
  type FormElement,
  type FormElementId,
  type FormElementValue,
  type FormElementValueMap,
} from './elements';

export * from './documents';
export * from './elements';
export * from './prompts';

export type FormDefinition<T extends FormStrategy = SequentialStrategy> = {
  summary: FormSummary;
  elements: Record<FormElementId, FormElement>;
  strategy: T;
  documents: FormOutput[];
};

export type FormSummary = {
  title: string;
  description: string;
};

type ErrorMap = Record<FormElementId, string>;
export type FormSession<T extends FormStrategy> = {
  data: {
    errors: ErrorMap;
    values: FormElementValueMap;
  };
  form: FormDefinition<T>;
};

export type SequentialStrategy = {
  type: 'sequential';
  order: FormElementId[];
};

export type NullStrategy = {
  type: 'null';
};

export type FormStrategy = SequentialStrategy | NullStrategy;

type FormOutput = {
  data: Uint8Array;
  path: string;
  fields: DocumentFieldMap;
  formFields: Record<string, string>;
};

export const createForm = (
  summary: FormSummary,
  elements: FormElement[] = []
): FormDefinition => {
  return {
    summary,
    elements: getFormElementMap(elements),
    strategy: {
      type: 'sequential',
      order: elements.map(element => {
        return element.id;
      }),
    },
    documents: [],
  };
};

export const createFormSession = <T extends FormStrategy>(
  form: FormDefinition<T>
): FormSession<T> => {
  return {
    data: {
      errors: {},
      values: Object.fromEntries(
        Object.values(form.elements).map(element => {
          return [element.id, element.initial];
        })
      ),
    },
    form,
  };
};

export const updateForm = <T extends FormStrategy>(
  context: FormSession<T>,
  id: FormElementId,
  value: any
) => {
  if (!(id in context.form.elements)) {
    console.error(`FormElement "${id}" does not exist on form.`);
    return context;
  }
  const nextForm = addValue(context, id, value);
  if (context.form.elements[id].required && !value) {
    return addError(nextForm, id, 'Required value not provided.');
  }
  return nextForm;
};

const addValue = <T extends FormStrategy>(
  form: FormSession<T>,
  id: FormElementId,
  value: FormElementValue
): FormSession<T> => ({
  ...form,
  data: {
    ...form.data,
    values: {
      ...form.data.values,
      [id]: value,
    },
  },
});

const addError = <T extends FormStrategy>(
  session: FormSession<T>,
  id: FormElementId,
  error: string
): FormSession<T> => ({
  ...session,
  data: {
    ...session.data,
    errors: {
      ...session.data.errors,
      [id]: error,
    },
  },
});

export const addFormElements = (
  form: FormDefinition<SequentialStrategy>,
  elements: FormElement[]
) => {
  const formElementMap = getFormElementMap(elements);
  return {
    ...form,
    elements: { ...form.elements, ...formElementMap },
    strategy: {
      ...form.strategy,
      order: [...form.strategy.order, ...Object.keys(formElementMap)],
    },
  };
};

export const replaceFormElements = (
  form: FormDefinition,
  elements: FormElement[]
): FormDefinition => {
  return {
    ...form,
    elements: elements.reduce(
      (acc, element) => {
        acc[element.id] = element;
        return acc;
      },
      {} as Record<FormElementId, FormElement>
    ),
  };
};

export const getFlatFieldList = <T extends FormStrategy>(
  form: FormDefinition<T>
) => {
  if (form.strategy.type === 'sequential') {
    return form.strategy.order.map(elementId => {
      return form.elements[elementId];
    });
  } else if (form.strategy.type === 'null') {
    return [];
  } else {
    const _exhaustiveCheck: never = form.strategy;
    return _exhaustiveCheck;
  }
};

export const addFormOutput = <T extends FormStrategy>(
  form: FormDefinition<T>,
  document: FormOutput
) => {
  return {
    ...form,
    documents: [...form.documents, document],
  };
};

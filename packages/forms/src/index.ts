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
export type FormContext<T extends FormStrategy> = {
  context: {
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

export const createFormContext = <T extends FormStrategy>(
  form: FormDefinition<T>
): FormContext<T> => {
  return {
    context: {
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
  context: FormContext<T>,
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
  form: FormContext<T>,
  id: FormElementId,
  value: FormElementValue
): FormContext<T> => ({
  ...form,
  context: {
    ...form.context,
    values: {
      ...form.context.values,
      [id]: value,
    },
  },
});

const addError = <T extends FormStrategy>(
  form: FormContext<T>,
  id: FormElementId,
  error: string
): FormContext<T> => ({
  ...form,
  context: {
    ...form.context,
    errors: {
      ...form.context.errors,
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

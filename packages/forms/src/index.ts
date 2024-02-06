import { type DocumentFieldMap } from './documents';
import {
  getFormElementMap,
  type FormElement,
  type FormElementId,
  type FormElementValue,
  type FormElementValueMap,
  type FormElementMap,
} from './elements';

export * from './documents';
export * from './elements';
export * from './prompts';

export type FormDefinition<T extends FormStrategy = SequentialStrategy> = {
  summary: FormSummary;
  root: FormElementId;
  elements: FormElementMap;
  outputs: FormOutput[];

  // to remove?
  strategy: T;
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
  initial: {
    elements: FormElement[];
    root: FormElementId;
  } = {
    elements: [
      {
        id: 'root',
        type: 'sequence',
        elements: [],
      },
    ],
    root: 'root',
  }
): FormDefinition => {
  const order = initial.elements.map(element => {
    return element.id;
  });
  return {
    summary,
    root: 'root',
    elements: {
      root: {
        id: 'root',
        type: 'sequence',
        elements: order,
      },
      ...getFormElementMap(initial.elements),
    },
    strategy: {
      type: 'sequential',
      order,
    },
    outputs: [],
  };
};

export const getRootFormElement = <T extends FormStrategy>(
  form: FormDefinition<T>
) => {
  return form.elements[form.root];
};

const initialValueForFormElement = (element: FormElement) => {
  if (element.type === 'input') {
    return element.initial;
  } else if (element.type === 'sequence') {
    return [];
  } else {
    const _exhaustiveCheck: never = element;
    return _exhaustiveCheck;
  }
};

export const createFormSession = <T extends FormStrategy>(
  form: FormDefinition<T>
): FormSession<T> => {
  return {
    data: {
      errors: {},
      values: Object.fromEntries(
        Object.values(form.elements).map(element => {
          return [element.id, initialValueForFormElement(element)];
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
  const element = context.form.elements[id];
  if (element.type === 'input') {
    if (element.required && !value) {
      return addError(nextForm, id, 'Required value not provided.');
    }
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
  elements: FormElement[],
  root?: FormElementId
) => {
  const formElementMap = getFormElementMap(elements);
  return {
    ...form,
    elements: { ...form.elements, ...formElementMap },
    strategy: {
      ...form.strategy,
      order: [...form.strategy.order, ...Object.keys(formElementMap)],
    },
    root: root !== undefined ? root : form.root,
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

export const updateElements = (
  form: FormDefinition,
  newElements: FormElementMap
): FormDefinition => {
  const root = form.elements[form.root];
  const targetElements: FormElementMap = {
    root,
  };
  contributeElements(targetElements, newElements, root);
  return {
    ...form,
    elements: targetElements,
  };
};

// Contribute a FormElement and all its children to a FormElementMap.
// This function may be used to create a minimal map of required fields.
const contributeElements = (
  target: FormElementMap,
  source: FormElementMap,
  element: FormElement
): FormElementMap => {
  if (element.type === 'input') {
    target[element.id] = element;
    return target;
  } else if (element.type === 'sequence') {
    element.elements.forEach(elementId => {
      const sequenceElement = source[elementId];
      return contributeElements(target, source, sequenceElement);
    });
    return target;
  } else {
    const _exhaustiveCheck: never = element;
    return _exhaustiveCheck;
  }
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
    outputs: [...form.outputs, document],
  };
};

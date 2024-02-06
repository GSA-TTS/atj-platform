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

export type FormDefinition = {
  summary: FormSummary;
  root: FormElementId;
  elements: FormElementMap;
  outputs: FormOutput[];
};

export type FormSummary = {
  title: string;
  description: string;
};

type ErrorMap = Record<FormElementId, string>;
export type FormSession = {
  data: {
    errors: ErrorMap;
    values: FormElementValueMap;
  };
  form: FormDefinition;
};

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
  return {
    summary,
    root: 'root',
    elements: {
      root: {
        id: 'root',
        type: 'sequence',
        elements: initial.elements.map(element => {
          return element.id;
        }),
      },
      ...getFormElementMap(initial.elements),
    },
    outputs: [],
  };
};

export const getRootFormElement = (form: FormDefinition) => {
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

export const createFormSession = (form: FormDefinition): FormSession => {
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

export const updateForm = (
  context: FormSession,
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

export const addFormElements = (
  form: FormDefinition,
  elements: FormElement[],
  root?: FormElementId
) => {
  const formElementMap = getFormElementMap(elements);
  return {
    ...form,
    elements: { ...form.elements, ...formElementMap },
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
  const root = newElements[form.root];
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

export const addFormOutput = (form: FormDefinition, document: FormOutput) => {
  return {
    ...form,
    outputs: [...form.outputs, document],
  };
};

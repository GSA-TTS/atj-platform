import { FormConfig } from './config';
import { SequenceElement } from './config/elements/sequence';
import { DocumentFieldMap } from './documents';
import {
  type FormElement,
  type FormElementId,
  type FormElementMap,
  type FormElementValue,
  type FormElementValueMap,
  getFormElementMap,
  getFormElementConfig,
} from './element';

export * from './builder';
export * from './config';
export * from './documents';
export * from './element';
export * from './pattern';
export * from './response';
export * from './session';

export type FormDefinition = {
  summary: FormSummary;
  root: FormElementId;
  elements: FormElementMap;
  outputs: FormOutput[];
};

export const nullFormDefinition: FormDefinition = {
  summary: {
    title: '',
    description: '',
  },
  root: 'root',
  elements: {
    root: {
      type: 'sequence',
      id: 'root',
      data: {
        elements: [],
      },
      default: {
        elements: [],
      },
      required: true,
    },
  },
  outputs: [],
};

export type FormSummary = {
  title: string;
  description: string;
};

export type FormSessionId = string;
type ErrorMap = Record<FormElementId, string>;
export type FormSession = {
  id: FormSessionId;
  data: {
    errors: ErrorMap;
    values: FormElementValueMap;
  };
  form: FormDefinition;
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
    elements: FormElement[];
    root: FormElementId;
  } = {
    elements: [
      {
        id: 'root',
        type: 'sequence',
        data: {
          elements: [],
        },
        default: {
          elements: [],
        },
        required: true,
      } satisfies SequenceElement,
    ],
    root: 'root',
  }
): FormDefinition => {
  return {
    summary,
    root: initial.root,
    elements: getFormElementMap(initial.elements),
    outputs: [],
  };
};

export const getRootFormElement = (form: FormDefinition) => {
  return form.elements[form.root];
};

export const createFormSession = (form: FormDefinition): FormSession => {
  return {
    id: crypto.randomUUID(),
    data: {
      errors: {},
      values: Object.fromEntries(
        Object.values(form.elements).map((element, index) => {
          return [element.id, form.elements[element.id].data.initial];
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
    if (element.data.required && !value) {
      return addError(nextForm, id, 'Required value not provided.');
    }
  }
  return nextForm;
};

const addValue = <T extends FormElement = FormElement>(
  form: FormSession,
  id: FormElementId,
  value: FormElementValue<T>
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

export const addFormElementMap = (
  form: FormDefinition,
  elements: FormElementMap,
  root?: FormElementId
) => {
  return {
    ...form,
    elements: { ...form.elements, ...elements },
    root: root !== undefined ? root : form.root,
  };
};

export const addFormElements = (
  form: FormDefinition,
  elements: FormElement[],
  root?: FormElementId
) => {
  const formElementMap = getFormElementMap(elements);
  return addFormElementMap(form, formElementMap, root);
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
  config: FormConfig,
  form: FormDefinition,
  newElements: FormElementMap
): FormDefinition => {
  const root = newElements[form.root];
  const targetElements: FormElementMap = {
    root,
  };
  const resource = config.elements[root.type as keyof FormConfig];
  const children = resource.getChildren(root, newElements);
  targetElements[root.id] = root;
  children.forEach(child => (targetElements[child.id] = child));
  return {
    ...form,
    elements: targetElements,
  };
};

export const updateElement = (
  form: FormDefinition,
  formElement: FormElement
): FormDefinition => {
  return {
    ...form,
    elements: {
      ...form.elements,
      [formElement.id]: formElement,
    },
  };
};

export const addFormOutput = (form: FormDefinition, document: FormOutput) => {
  return {
    ...form,
    outputs: [...form.outputs, document],
  };
};

export const getFormElement = (form: FormDefinition, id: FormElementId) => {
  return form.elements[id];
};

export const updateFormSummary = (
  form: FormDefinition,
  summary: FormSummary
) => {
  return {
    ...form,
    summary,
  };
};

export const updateFormElement = (
  config: FormConfig,
  form: FormDefinition,
  formElement: FormElement,
  formData: FormElementMap
) => {
  const elementConfig = getFormElementConfig(config, formElement.type);
  const data = formData[formElement.id].data;
  const result = elementConfig.parseConfigData(data);
  if (!result.success) {
    return;
  }
  const updatedForm = updateElement(form, {
    ...formElement,
    data: result.data,
  });
  return updatedForm;
};

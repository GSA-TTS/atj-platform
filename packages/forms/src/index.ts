import { FormConfig } from './config';
import { SequenceElement } from './config/elements/sequence';
import { DocumentFieldMap } from './documents';
import {
  type Pattern,
  type PatternId,
  type PatternMap,
  type PatternValue,
  type PatternValueMap,
  getPatternMap,
  getPatternConfig,
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
  root: PatternId;
  elements: PatternMap;
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
type ErrorMap = Record<PatternId, string>;
export type FormSession = {
  id: FormSessionId;
  data: {
    errors: ErrorMap;
    values: PatternValueMap;
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
    elements: Pattern[];
    root: PatternId;
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
    elements: getPatternMap(initial.elements),
    outputs: [],
  };
};

export const getRootPattern = (form: FormDefinition) => {
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

export const updateForm = (context: FormSession, id: PatternId, value: any) => {
  if (!(id in context.form.elements)) {
    console.error(`Pattern "${id}" does not exist on form.`);
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

export const addPatternMap = (
  form: FormDefinition,
  elements: PatternMap,
  root?: PatternId
) => {
  return {
    ...form,
    elements: { ...form.elements, ...elements },
    root: root !== undefined ? root : form.root,
  };
};

export const addPatterns = (
  form: FormDefinition,
  elements: Pattern[],
  root?: PatternId
) => {
  const formElementMap = getPatternMap(elements);
  return addPatternMap(form, formElementMap, root);
};

export const replacePatterns = (
  form: FormDefinition,
  elements: Pattern[]
): FormDefinition => {
  return {
    ...form,
    elements: elements.reduce(
      (acc, element) => {
        acc[element.id] = element;
        return acc;
      },
      {} as Record<PatternId, Pattern>
    ),
  };
};

export const updateElements = (
  config: FormConfig,
  form: FormDefinition,
  newElements: PatternMap
): FormDefinition => {
  const root = newElements[form.root];
  const targetElements: PatternMap = {
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
  formElement: Pattern
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

export const getPattern = (form: FormDefinition, id: PatternId) => {
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

export const updatePattern = (
  config: FormConfig,
  form: FormDefinition,
  formElement: Pattern,
  formData: PatternMap
) => {
  const elementConfig = getPatternConfig(config, formElement.type);
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

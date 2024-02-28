import { type Result } from '@atj/common';
import {
  type FormElementConfig,
  type FormConfig,
  type FormDefinition,
} from '..';

export type FormElement<T = any, C = any> = {
  type: string;
  id: FormElementId;
  data: C;
  default: T;
  required: boolean;
};

export type FormElementId = string;
export type FormElementValue<T extends FormElement = FormElement> =
  T['default'];
export type FormElementValueMap = Record<FormElementId, FormElementValue>;
export type FormElementMap = Record<FormElementId, FormElement>;
export type GetFormElement = (
  form: FormDefinition,
  id: FormElementId
) => FormElement;

export type ParseFormElementData<T extends FormElement = FormElement> = (
  elementData: T['data'],
  obj: string
) => Result<T['data']>;

export type ParseFormElementConfigData<T extends FormElement = FormElement> = (
  elementData: T['data']
) => Result<T['data']>;

export const getFormElement: GetFormElement = (form, elementId) => {
  return form.elements[elementId];
};

export const getFormElementMap = (elements: FormElement[]) => {
  return Object.fromEntries(
    elements.map(element => {
      return [element.id, element];
    })
  );
};

export const getFormElements = (
  form: FormDefinition,
  elementIds: FormElementId[]
) => {
  return elementIds.map(elementId => getFormElement(form, elementId));
};

export const getFormElementConfig = (
  config: FormConfig,
  elementType: FormElement['type']
) => {
  return config.elements[elementType];
};

export const validateElement = (
  elementConfig: FormElementConfig<FormElement>,
  element: FormElement,
  value: any
): Result<FormElement['data']> => {
  if (!elementConfig.acceptsInput) {
    return {
      success: true,
      data: value,
    };
  }
  const parseResult = elementConfig.parseData(element, value);
  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error,
    };
  }
  if (element.data.required && !parseResult.data) {
    return {
      success: false,
      error: 'Required value not provided.',
    };
  }
  return {
    success: true,
    data: parseResult.data,
  };
};

export const getFirstFormElement = (
  config: FormConfig,
  form: FormDefinition,
  element?: FormElement
): FormElement => {
  if (!element) {
    element = form.elements[form.root];
  }
  const elemConfig = getFormElementConfig(config, element.type);
  const children = elemConfig.getChildren(element, form.elements);
  if (children?.length === 0) {
    return element;
  }
  return getFirstFormElement(config, form, children[0]);
};

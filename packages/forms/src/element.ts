import { type Result } from '@atj/common';
import { type FormConfig, type FormDefinition } from '..';

export type FormElement<T = any, C = any> = {
  type: string;
  id: FormElementId;
  data: C;
  default: T;
  required: boolean;
};

export type FormElementId = string;
export type FormElementValue = any;
export type FormElementValueMap = Record<FormElementId, FormElementValue>;
export type FormElementMap = Record<FormElementId, FormElement>;
export type GetFormElement = (
  form: FormDefinition,
  id: FormElementId
) => FormElement;

export type ParseFormElementData<T extends FormElement> = (
  element: T,
  obj: string
) => Result<T['data']>;

export const getFormElementMap = (elements: FormElement[]) => {
  return Object.fromEntries(
    elements.map(element => {
      return [element.id, element];
    })
  );
};

export const getFormElementConfig = (
  config: FormConfig,
  elementType: FormElement['type']
) => {
  return config.elements[elementType];
};

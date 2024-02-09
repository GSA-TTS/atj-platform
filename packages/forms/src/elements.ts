import { FormDefinition } from '..';

export type FormElement<T> = {
  type: string;
  id: FormElementId;
  data: T;
};

export type FormElementId = string;
export type FormElementValue = any;
export type FormElementValueMap = Record<FormElementId, FormElementValue>;
export type FormElementMap = Record<FormElementId, FormElement<any>>;
export type GetFormElement = (
  form: FormDefinition,
  id: FormElementId
) => FormElement<any>;

export const getFormElementMap = (elements: FormElement<any>[]) => {
  return Object.fromEntries(
    elements.map(element => {
      return [element.id, element];
    })
  );
};

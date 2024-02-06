import { InputElement } from './input';
import { SequenceElement } from './sequence';

// The collection of all form elements is a discriminated union.
// We may want the user of this library to be able to inject their own element
// types, but for now, we will just hardcode this type.
export type FormElement = InputElement | SequenceElement;

export type FormElementId = string;
export type FormElementValue = any;
export type FormElementValueMap = Record<FormElementId, FormElementValue>;
export type FormElementMap = Record<FormElementId, FormElement>;

export const getFormElementMap = (elements: FormElement[]) => {
  return Object.fromEntries(
    elements.map(element => {
      return [element.id, element];
    })
  );
};

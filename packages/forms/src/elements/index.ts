export type FormElementId = string;

export type FormElement = {
  id: FormElementId;
  text: string;
  initial: string | boolean | string[]; // TODO: create separate types
  required: boolean;
};
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

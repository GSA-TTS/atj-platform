import { type CreatePrompt } from '../prompts';
import { type FormElement, type FormElementId } from '../elements';
export { defaultFormConfig } from './config';

export type FormElementConfig<ThisFormElement extends FormElement<any>> = {
  initial: ThisFormElement['data'];
  parseData: (obj: any) => ThisFormElement;
  getChildren: (
    element: ThisFormElement,
    elements: Record<FormElementId, FormElement<any>>
  ) => FormElement<any>[];
  createPrompt: CreatePrompt<ThisFormElement>;
};
export type FormConfig<T extends FormElement<any> = FormElement<any>> = {
  elements: Record<string, FormElementConfig<T>>;
};

export type ConfigElements<Config extends FormConfig> =
  keyof Config['elements'];

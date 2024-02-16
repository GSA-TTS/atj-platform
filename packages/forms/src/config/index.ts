import { type FormElement, type FormElementId } from '../element';
import { type CreatePrompt } from '../prompt';

export { defaultFormConfig } from './config';

export type FormElementConfig<ThisFormElement extends FormElement<any>> = {
  initial: ThisFormElement['data'];
  parseData: (obj: any) => ThisFormElement;
  isValid: (obj: any) => boolean;
  getChildren: (
    element: ThisFormElement,
    elements: Record<FormElementId, FormElement<any>>
  ) => FormElement<any>[];
  createPrompt: CreatePrompt<ThisFormElement>;
};
export type FormConfig<T extends FormElement<any> = FormElement<any>> = {
  elements: Record<string, FormElementConfig<T>>;
};

export type ConfigElements<Config extends FormConfig> = ReturnType<
  Config['elements'][keyof Config['elements']]['parseData']
>;

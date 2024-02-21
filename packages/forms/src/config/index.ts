import {
  type FormElement,
  type FormElementId,
  type ParseFormElementData,
} from '../element';
import { type CreatePrompt } from '../prompt';

export { defaultFormConfig } from './config';

export type FormElementConfig<ThisFormElement extends FormElement<any>> = {
  acceptsInput: boolean;
  initial: ThisFormElement['data'];
  parseData: ParseFormElementData<ThisFormElement>;
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

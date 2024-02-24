import {
  type FormElement,
  type FormElementId,
  type ParseFormElementData,
} from '../element';
import { type CreatePrompt } from '../prompt';

export { defaultFormConfig } from './config';

export type FormElementConfig<ThisFormElement extends FormElement> = {
  acceptsInput: boolean;
  initial: ThisFormElement['data'];
  parseData: ParseFormElementData<ThisFormElement>;
  getChildren: (
    element: ThisFormElement,
    elements: Record<FormElementId, FormElement>
  ) => FormElement[];
  createPrompt: CreatePrompt<ThisFormElement>;
};
export type FormConfig<T extends FormElement = FormElement> = {
  elements: Record<string, FormElementConfig<T>>;
};

export type ConfigElements<Config extends FormConfig> = ReturnType<
  Config['elements'][keyof Config['elements']]['parseData']
>;

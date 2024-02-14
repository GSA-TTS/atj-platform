import React from 'react';

import { FormElement, type FormConfig, type FormDefinition } from '@atj/forms';

import InputElementEdit from './InputElementEdit';
import SequenceElementEdit from './SequenceElementEdit';

export type FormUIContext = {
  config: FormConfig;
  components: ComponentForFormElement;
};

export type FormElementComponent<T extends FormElement> = React.ComponentType<{
  context: FormUIContext;
  form: FormDefinition;
  element: T;
}>;

export type ComponentForFormElement<T extends FormElement = FormElement> =
  Record<string, FormElementComponent<T>>;

export const defaultFormElementComponent: ComponentForFormElement = {
  sequence: SequenceElementEdit,
  input: InputElementEdit,
};

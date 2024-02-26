import React from 'react';

import { FormElement, type FormConfig, type FormDefinition } from '@atj/forms';

import InputElementEdit from './edit/InputElementEdit';
import ParagraphElementEdit from './edit/ParagraphElementEdit';
import SequenceElementEdit from './edit/SequenceElementEdit';

export * from './edit';
export * from './view';

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

export const defaultFormElementComponents: ComponentForFormElement = {
  sequence: SequenceElementEdit,
  input: InputElementEdit,
  paragraph: ParagraphElementEdit,
};

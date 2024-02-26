import React from 'react';

import {
  type FormConfig,
  type FormDefinition,
  type FormElement,
} from '@atj/forms';

import InputElementEdit from './InputElementEdit';
import SequenceElementEdit from './SequenceElementEdit';
import { type ComponentForPattern } from 'config/view';

export type FormEditUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  editComponents: EditComponentForFormElement;
};

export type FormElementEditComponent<T extends FormElement> =
  React.ComponentType<{
    context: FormEditUIContext;
    form: FormDefinition;
    element: T;
  }>;

export type EditComponentForFormElement<T extends FormElement = FormElement> =
  Record<string, FormElementEditComponent<T>>;

export const defaultFormElementEditComponents: EditComponentForFormElement = {
  sequence: SequenceElementEdit,
  input: InputElementEdit,
};

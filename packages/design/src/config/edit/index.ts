import React from 'react';

import {
  type FormConfig,
  type FormDefinition,
  type FormElement,
} from '@atj/forms';

import { ComponentForPattern } from '../../Form';

import InputElementEdit from './InputElementEdit';
import SequenceElementEdit from './SequenceElementEdit';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit';

export type FormEditUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  editComponents: EditComponentForFormElement;
  uswdsRoot: `${string}/`;
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
  input: InputElementEdit,
  sequence: SequenceElementEdit,
  'submission-confirmation': SubmissionConfirmationEdit,
};

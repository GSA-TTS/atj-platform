import {
  type FormConfig,
  type FormDefinition,
  type FormElement,
} from '@atj/forms';

import { type ComponentForPattern } from '../../Form';

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

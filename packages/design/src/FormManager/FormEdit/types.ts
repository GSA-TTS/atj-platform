import {
  type FormConfig,
  type FormDefinition,
  type FormElement,
} from '@atj/forms';

import { type ComponentForPattern } from '../../Form';

export type FormEditUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  editComponents: EditComponentForPattern;
  uswdsRoot: `${string}/`;
};

export type PatternEditComponent<T extends FormElement> = React.ComponentType<{
  context: FormEditUIContext;
  form: FormDefinition;
  element: T;
}>;

export type EditComponentForPattern<T extends FormElement = FormElement> =
  Record<string, PatternEditComponent<T>>;

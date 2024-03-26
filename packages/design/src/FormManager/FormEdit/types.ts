import { type FormConfig, type FormDefinition, type Pattern } from '@atj/forms';

import { type ComponentForPattern } from '../../Form';

export type FormEditUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  editComponents: EditComponentForPattern;
  uswdsRoot: `${string}/`;
};

export type PatternEditComponent<T extends Pattern> = React.ComponentType<{
  context: FormEditUIContext;
  form: FormDefinition;
  element: T;
}>;

export type EditComponentForPattern<T extends Pattern = Pattern> = Record<
  string,
  PatternEditComponent<T>
>;

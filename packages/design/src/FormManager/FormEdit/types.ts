import { type FormConfig, type Blueprint, type Pattern } from '@atj/forms';

import { type ComponentForPattern } from '../../Form';

export type FormEditUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  editComponents: EditComponentForPattern;
  uswdsRoot: `${string}/`;
};

export type PatternEditComponent<T extends Pattern> = React.ComponentType<{
  context: FormEditUIContext;
  form: Blueprint;
  pattern: T;
}>;

export type EditComponentForPattern<T extends Pattern = Pattern> = Record<
  string,
  PatternEditComponent<T>
>;

import {
  type FormConfig,
  type Blueprint,
  type Pattern,
  type PatternProps,
} from '@atj/forms';

import { type ComponentForPattern } from '../../Form';

export type FormEditUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  editComponents: EditComponentForPattern;
  uswdsRoot: `${string}/`;
};

export type PatternEditComponent<T extends Pattern = Pattern> =
  React.ComponentType<{
    context: FormEditUIContext;
    previewProps: PatternProps;
  }>;

export type EditComponentForPattern<T extends Pattern = Pattern> = Record<
  string,
  PatternEditComponent<T>
>;

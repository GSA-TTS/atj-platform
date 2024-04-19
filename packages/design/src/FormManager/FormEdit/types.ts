import { type FormConfig, type PatternProps } from '@atj/forms';

import { type ComponentForPattern } from '../../Form';

export type FormEditUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  editComponents: EditComponentForPattern;
  uswdsRoot: `${string}/`;
};

export type PatternEditComponent<T extends PatternProps = PatternProps> =
  React.ComponentType<{
    context: FormEditUIContext;
    previewProps: T;
  }>;

export type EditComponentForPattern<T extends PatternProps = PatternProps> =
  Record<string, PatternEditComponent<T>>;

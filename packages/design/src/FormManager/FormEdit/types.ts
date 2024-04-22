import { type PatternProps } from '@atj/forms';
import { FormManagerContext } from '..';

export type PatternEditComponent<T extends PatternProps = PatternProps> =
  React.ComponentType<{
    context: FormManagerContext;
    previewProps: T;
  }>;

export type EditComponentForPattern<T extends PatternProps = PatternProps> =
  Record<string, PatternEditComponent<T>>;

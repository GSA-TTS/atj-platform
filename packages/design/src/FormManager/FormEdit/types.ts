import { type Pattern, type PatternProps } from '@atj/forms';
import { FormManagerContext } from '..';

export type PatternFocus = {
  pattern: Pattern;
  errors?: Record<string, string>;
};

export type PatternEditComponent<T extends PatternProps = PatternProps> =
  React.ComponentType<{
    context: FormManagerContext;
    previewProps: T;
    focus?: PatternFocus;
  }>;

export type EditComponentForPattern<T extends PatternProps = PatternProps> =
  Record<string, PatternEditComponent<T>>;

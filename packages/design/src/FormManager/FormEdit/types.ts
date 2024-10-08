import { type PropsWithChildren } from 'react';

import { type FormErrors, type Pattern, type PatternProps } from '@atj/forms';
import { FormManagerContext } from '../index.js';

export type PatternFocus = {
  pattern: Pattern;
  errors?: FormErrors;
};

export type PatternEditComponent<T extends PatternProps = PatternProps> =
  React.ComponentType<{
    context: FormManagerContext;
    previewProps: PropsWithChildren<T>;
    focus?: PatternFocus;
  }>;

export type EditComponentForPattern = Record<string, PatternEditComponent>;

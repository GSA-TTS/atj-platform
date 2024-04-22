import { type FormConfig, type PatternProps } from '@atj/forms';

import { type ComponentForPattern } from '../../Form';
import { FormService } from '@atj/form-service';

export type FormEditUIContext = {
  components: ComponentForPattern;
  config: FormConfig;
  editComponents: EditComponentForPattern;
  formService: FormService;
  uswdsRoot: `${string}/`;
};

export type PatternEditComponent<T extends PatternProps = PatternProps> =
  React.ComponentType<{
    context: FormEditUIContext;
    previewProps: T;
  }>;

export type EditComponentForPattern<T extends PatternProps = PatternProps> =
  Record<string, PatternEditComponent<T>>;

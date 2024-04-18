import { type FormConfig } from '@atj/forms';

import { type ComponentForPattern } from '../../Form';

export type FormEditUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  editComponents: ComponentForPattern;
  uswdsRoot: `${string}/`;
};

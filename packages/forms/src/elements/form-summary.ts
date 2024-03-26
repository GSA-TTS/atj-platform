import * as z from 'zod';

import { type FormElement, type FormElementConfig } from '../element';
import { type FormSummaryPattern, type Pattern } from '../pattern';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  title: z.string().max(128),
  summary: z.string().max(2024),
});
export type FormSummary = FormElement<z.infer<typeof configSchema>>;

export const formSummaryConfig: FormElementConfig<FormSummary> = {
  acceptsInput: false,
  initial: {
    text: '',
    initial: '',
    required: true,
    maxLength: 128,
  },
  parseData: obj => safeZodParse(configSchema, obj), // make this optional?
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, element, options) {
    return {
      pattern: {
        _elementId: element.id,
        type: 'form-summary',
        title: element.data.title,
        description: element.data.description,
      } as PatternProps<FormSummaryPattern>,
      children: [],
    };
  },
};

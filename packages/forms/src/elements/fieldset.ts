import * as z from 'zod';

import {
  type FormElement,
  type FormElementConfig,
  type FormElementId,
  getFormElement,
} from '../element';
import {
  type FieldsetPattern,
  type PatternProps,
  createPromptForElement,
} from '../pattern';
import { safeZodParse } from '../util/zod';

export type FieldsetElement = FormElement<{
  legend?: string;
  elements: FormElementId[];
}>;

const FieldsetSchema = z.array(z.string());

const configSchema = z.object({
  legend: z.string().optional(),
  elements: z.array(z.string()),
});

export const fieldsetConfig: FormElementConfig<FieldsetElement> = {
  acceptsInput: false,
  initial: {
    elements: [],
  },
  parseData: (_, obj) => {
    return safeZodParse(FieldsetSchema, obj);
  },
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren(element, elements) {
    return element.data.elements.map(
      (elementId: string) => elements[elementId]
    );
  },
  createPrompt(config, session, element, options) {
    const children = element.data.elements.map((elementId: string) => {
      const element = getFormElement(session.form, elementId);
      return createPromptForElement(config, session, element, options);
    });
    return {
      pattern: {
        _children: children,
        _elementId: element.id,
        type: 'fieldset',
        legend: element.data.legend,
      } satisfies PatternProps<FieldsetPattern>,
      children,
    };
  },
};

import * as z from 'zod';

import { type FormElementConfig } from '..';
import { type FormElement, type FormElementId } from '../../element';
import { type Pattern, createPromptForElement } from '../../pattern';
import { safeZodParse } from '../../util/zod';

export type FieldsetElement = FormElement<{
  legend: string;
  elements: FormElementId;
}>;

const fieldsetSchema = z.object({
  legend: z.string(),
  elements: z.array(z.string()),
});

export const fieldsetConfig: FormElementConfig<FieldsetElement> = {
  acceptsInput: false,
  initial: {
    elements: [],
  },
  parseData: (_, obj) => {
    return safeZodParse(fieldsetSchema, obj);
  },
  getChildren(element, elements) {
    return element.data.elements.map(
      (elementId: string) => elements[elementId]
    );
  },
  createPrompt(config, session, element, options): Pattern[] {
    return element.data.elements.map((elementId: string) => {
      const element = session.form.elements[elementId];
      return createPromptForElement(config, session, element, options);
    });
  },
};

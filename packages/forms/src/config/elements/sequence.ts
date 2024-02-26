import * as z from 'zod';

import { type FormElementConfig } from '..';
import { type FormElement, type FormElementId } from '../../element';
import { type Pattern, createPromptForElement } from '../../prompt';
import { safeZodParse } from '../../util/zod';

export type SequenceElement = FormElement<{
  elements: FormElementId[];
}>;

const sequenceSchema = z.array(z.string());

export const sequenceConfig: FormElementConfig<SequenceElement> = {
  acceptsInput: false,
  initial: {
    elements: [],
  },
  parseData: (_, obj) => {
    return safeZodParse(sequenceSchema, obj);
  },
  getChildren(element, elements) {
    return element.data.elements.map(
      (elementId: string) => elements[elementId]
    );
  },
  createPrompt(config, session, element, options): Pattern[] {
    return element.data.elements.flatMap((elementId: string) => {
      const element = session.form.elements[elementId];
      return createPromptForElement(config, session, element, options);
    });
  },
};

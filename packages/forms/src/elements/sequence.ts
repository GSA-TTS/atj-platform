import * as z from 'zod';

import {
  type FormElement,
  type FormElementConfig,
  type FormElementId,
  getFormElement,
} from '../element';
import { createPromptForElement } from '../pattern';
import { safeZodParse } from '../util/zod';

export type SequenceElement = FormElement<{
  elements: FormElementId[];
}>;

const sequenceSchema = z.array(z.string());

const configSchema = z.object({
  elements: z.array(z.string()),
});

export const sequenceConfig: FormElementConfig<SequenceElement> = {
  acceptsInput: false,
  initial: {
    elements: [],
  },
  parseData: (_, obj) => {
    return safeZodParse(sequenceSchema, obj);
  },
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren(element, elements) {
    return element.data.elements.map(
      (elementId: string) => elements[elementId]
    );
  },
  createPrompt(config, session, element, options) {
    const children = element.data.elements.map((elementId: string) => {
      const childElement = getFormElement(session.form, elementId);
      return createPromptForElement(config, session, childElement, options);
    });
    return {
      pattern: {
        _children: children,
        _elementId: element.id,
        type: 'sequence',
      },
      children,
    };
  },
};

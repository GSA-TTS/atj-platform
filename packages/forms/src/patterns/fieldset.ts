import * as z from 'zod';

import {
  type Pattern,
  type PatternConfig,
  type PatternId,
  getPattern,
} from '../pattern';
import { type FieldsetProps, createPromptForElement } from '../components';
import { safeZodParse } from '../util/zod';

export type FieldsetElement = Pattern<{
  legend?: string;
  elements: PatternId[];
}>;

const FieldsetSchema = z.array(z.string());

const configSchema = z.object({
  legend: z.string().optional(),
  elements: z.array(z.string()),
});

export const fieldsetConfig: PatternConfig<FieldsetElement> = {
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
      const element = getPattern(session.form, elementId);
      return createPromptForElement(config, session, element, options);
    });
    return {
      pattern: {
        _children: children,
        _elementId: element.id,
        type: 'fieldset',
        legend: element.data.legend,
      } satisfies FieldsetProps,
      children,
    };
  },
};

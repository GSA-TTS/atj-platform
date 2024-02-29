import * as z from 'zod';

import { type FormElementConfig } from '..';
import { type FormElement } from '../../element';
import { type Pattern, type ParagraphPattern } from '../../pattern';
import { safeZodParse } from '../../util/zod';

export type ParagraphElement = FormElement<{
  text: string;
  maxLength: number;
}>;

const createSchema = (data: ParagraphElement['data']) =>
  z.string().max(data.maxLength);

export const paragraphConfig: FormElementConfig<ParagraphElement> = {
  acceptsInput: false,
  initial: {
    maxLength: 2048,
    text: '',
  },
  parseData: (elementData, obj) => safeZodParse(createSchema(elementData), obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, element, options) {
    return {
      pattern: {
        _elementId: element.id,
        type: 'paragraph' as const,
        text: element.data.text,
      } as Pattern<ParagraphPattern>,
      children: [],
    };
  },
};

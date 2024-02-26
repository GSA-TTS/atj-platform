import * as z from 'zod';

import { type FormElementConfig } from '..';
import { type FormElement, validateElement } from '../../element';
import { type PromptPart } from '../../prompt';
import { getFormSessionValue } from '../../session';
import { safeZodParse } from '../../util/zod';

export type ParagraphElement = FormElement<{
  text: string;
}>;

const createSchema = (data: ParagraphElement['data']) =>
  z.string().max(data.maxLength);

export const paragraphConfig: FormElementConfig<ParagraphElement> = {
  acceptsInput: false,
  initial: {
    text: '',
  },
  parseData: (elementData, obj) => safeZodParse(createSchema(elementData), obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, element, options): PromptPart[] {
    return [
      {
        type: 'text' as const,
        id: element.id,
        value: element.data.text,
      },
    ];
  },
};

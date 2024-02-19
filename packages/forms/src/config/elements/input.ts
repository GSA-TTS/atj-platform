import * as z from 'zod';

import { type FormElementConfig } from '..';
import { type FormElement } from '../../element';
import { PromptPart } from '../../prompt';
import { safeZodParse } from '../../util/zod';

export type InputElement = FormElement<{
  text: string;
  initial: string;
  required: boolean;
  maxLength: number;
}>;

const createSchema = (data: InputElement['data']) =>
  z.string().max(data.maxLength);

export const inputConfig: FormElementConfig<InputElement> = {
  initial: {
    text: '',
    initial: '',
    required: true,
    maxLength: 128,
  },
  parseData: (elementData, obj) => safeZodParse(createSchema(elementData), obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, element): PromptPart[] {
    const error = session.data.errors[element.id]
      ? {
          error: session.data.errors[element.id],
        }
      : {};
    return [
      {
        type: 'text' as const,
        id: element.id,
        value: session.data.values[element.id],
        label: element.data.text,
        required: element.data.required,
        ...error,
      },
    ];
  },
};

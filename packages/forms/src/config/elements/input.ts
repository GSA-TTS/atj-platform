import { type FormElementConfig } from '..';
import { type FormElement } from '../../element';
import { PromptPart } from '../../prompt';

export type InputElement = FormElement<{
  text: string;
  initial: string;
  required: boolean;
}>;

export const inputConfig: FormElementConfig<InputElement> = {
  initial: {
    text: '',
    initial: '',
    required: true,
  },
  parseData(obj: any) {
    // TODO: runtime validation
    return obj;
  },
  isValid: function (obj: any): boolean {
    return true;
  },
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

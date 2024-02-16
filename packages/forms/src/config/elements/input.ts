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
  getChildren() {
    return [];
  },
  createPrompt(_, session, element): PromptPart[] {
    return [
      {
        type: 'text' as const,
        id: element.id,
        value: session.data.values[element.id],
        label: element.data.text,
        required: element.data.required,
      },
    ];
  },
};

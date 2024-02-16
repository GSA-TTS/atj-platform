import { type FormElementConfig } from '..';
import { type FormElement, type FormElementId } from '../../element';
import { type PromptPart, createPromptForElement } from '../../prompt';

export type SequenceElement = FormElement<{
  elements: FormElementId[];
}>;

export const sequenceConfig: FormElementConfig<SequenceElement> = {
  initial: {
    elements: [],
  },
  parseData(obj) {
    return obj;
  },
  isValid: function (obj: any): boolean {
    return true;
  },
  getChildren(element, elements) {
    return element.data.elements.map(
      (elementId: string) => elements[elementId]
    );
  },
  createPrompt(config, session, element): PromptPart[] {
    return element.data.elements.flatMap((elementId: string) => {
      const element = session.form.elements[elementId];
      return createPromptForElement(config, session, element);
    });
  },
};

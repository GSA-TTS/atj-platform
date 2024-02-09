import { type FormElementConfig } from '..';
import { type FormElement, type FormElementId } from '../../elements';
import { type PromptPart, createPromptForElement } from '../../prompts';

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
  getChildren(element, elements) {
    return (element as SequenceElement).data.elements.map(
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

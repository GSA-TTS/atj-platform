import {
  FormDefinition,
  FormSession,
  FormStrategy,
  SequentialStrategy,
} from '..';
import { FormElement } from '../elements';
import { PromptPart } from '../prompts';

type FormConfigContext = {};

type FormElement<Schema extends { type: string }> = {
  parseData: (data: Schema) => Schema | Error;
  createPrompt?: (session: any, data: Schema) => PromptPart[]; // if a terminal element???
};

export const createFormConfig = (context: FormConfigContext) => {
  // or should this be createFormManager?
};

// don't design this backwards. might want to start at createPrompt, and add
// in the bits that are actually required.

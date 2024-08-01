import { PatternComponent, type ComponentForPattern } from '..';

import Address from './Address';
import Checkbox from './Checkbox';
import Fieldset from './Fieldset';
import FormSummary from './FormSummary';
import Page from './Page';
import PageSet from './PageSet';
import Paragraph from './Paragraph';
import RadioGroup from './RadioGroup';
import RichText from './RichText';
import Sequence from './Sequence';
import SubmissionConfirmation from './SubmissionConfirmation';
import TextInput from './TextInput';

export const defaultPatternComponents: ComponentForPattern = {
  address: Address as PatternComponent,
  checkbox: Checkbox as PatternComponent,
  fieldset: Fieldset as PatternComponent,
  'form-summary': FormSummary as PatternComponent,
  input: TextInput as PatternComponent,
  page: Page as PatternComponent,
  'page-set': PageSet as PatternComponent,
  paragraph: Paragraph as PatternComponent,
  'radio-group': RadioGroup as PatternComponent,
  'rich-text': RichText as PatternComponent,
  sequence: Sequence as PatternComponent,
  'submission-confirmation': SubmissionConfirmation as PatternComponent,
};

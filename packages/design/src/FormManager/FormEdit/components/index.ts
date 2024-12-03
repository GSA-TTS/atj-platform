import {
  type PatternEditComponent,
  type EditComponentForPattern,
} from '../types.js';

import AttachmentPatternEdit from './AttachmentPatternEdit/index.js';
import CheckboxPatternEdit from './CheckboxPatternEdit/index.js';
import DateOfBirthPatternEdit from './DateOfBirthPatternEdit/index.js';
import EmailInputPatternEdit from './EmailInputPatternEdit/index.js';
import FieldsetEdit from './FieldsetEdit/index.js';
import FormSummaryEdit from './FormSummaryEdit.js';
import InputPatternEdit from './InputPatternEdit/index.js';
import PackageDownloadPatternEdit from './PackageDownloadPatternEdit.js';
import PageSetEdit from './PageSetEdit/index.js';
import { PageEdit } from './PageEdit.js';
import ParagraphPatternEdit from './ParagraphPatternEdit/index.js';
import { PatternPreviewSequence } from './PreviewSequencePattern/index.js';
import PhoneNumberPatternEdit from './PhoneNumberPatternEdit/index.js';
import RadioGroupPatternEdit from './RadioGroupPatternEdit/index.js';
import RichTextPatternEdit from './RichTextPatternEdit/index.js';
import SelectDropdownPatternEdit from './SelectDropdownPatternEdit/index.js';
import SocialSecurityNumberPatternEdit from './SocialSecurityNumberPatternEdit/index.js';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit.js';

export const defaultPatternEditComponents: EditComponentForPattern = {
  attachment: AttachmentPatternEdit as PatternEditComponent,
  checkbox: CheckboxPatternEdit as PatternEditComponent,
  'date-of-birth': DateOfBirthPatternEdit as PatternEditComponent,
  'email-input': EmailInputPatternEdit as PatternEditComponent,
  fieldset: FieldsetEdit as PatternEditComponent,
  'form-summary': FormSummaryEdit as PatternEditComponent,
  input: InputPatternEdit as PatternEditComponent,
  'package-download': PackageDownloadPatternEdit as PatternEditComponent,
  page: PageEdit as PatternEditComponent,
  'page-set': PageSetEdit as PatternEditComponent,
  paragraph: ParagraphPatternEdit as PatternEditComponent,
  'phone-number': PhoneNumberPatternEdit as PatternEditComponent,
  'radio-group': RadioGroupPatternEdit as PatternEditComponent,
  'rich-text': RichTextPatternEdit as PatternEditComponent,
  'select-dropdown': SelectDropdownPatternEdit as PatternEditComponent,
  sequence: PatternPreviewSequence as PatternEditComponent,
  'social-security-number':
    SocialSecurityNumberPatternEdit as PatternEditComponent,
  'submission-confirmation': SubmissionConfirmationEdit as PatternEditComponent,
};

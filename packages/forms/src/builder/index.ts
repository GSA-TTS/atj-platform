import {
  type Blueprint,
  type FormConfig,
  type FormSummary,
  type Pattern,
  type PatternMap,
  addDocument,
  nullBlueprint,
  updateFormSummary,
  updatePatternFromFormData,
} from '..';

export class FormBuilder {
  private _form: Blueprint;

  constructor(initialForm: Blueprint = nullBlueprint) {
    this._form = initialForm || nullBlueprint;
  }

  get form(): Blueprint {
    return this._form;
  }

  setFormSummary(summary: FormSummary) {
    this._form = updateFormSummary(this.form, summary);
  }

  async addDocument(fileDetails: { name: string; data: Uint8Array }) {
    const { updatedForm } = await addDocument(this.form, fileDetails);
    this._form = updatedForm;
  }

  updatePattern(config: FormConfig, pattern: Pattern, formData: PatternMap) {
    const updatedElement = updatePatternFromFormData(
      config,
      this.form,
      pattern,
      formData
    );
    if (!updatedElement) {
      return false;
    }
    this._form = updatedElement;
    return true;
  }
}

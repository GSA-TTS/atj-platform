import {
  type Blueprint,
  type FormSummary,
  addDocument,
  nullBlueprint,
  updateFormSummary,
  updatePattern,
  PatternMap,
  Pattern,
  FormConfig,
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

  updatePattern(
    config: FormConfig,
    formElement: Pattern,
    formData: PatternMap
  ) {
    const updatedElement = updatePattern(
      config,
      this.form,
      formElement,
      formData
    );
    if (!updatedElement) {
      return false;
    }
    this._form = updatedElement;
    return true;
  }
}

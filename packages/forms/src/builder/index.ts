import {
  type FormDefinition,
  type FormSummary,
  addDocument,
  nullFormDefinition,
  updateFormSummary,
  updateFormElement,
  FormElementMap,
  FormElement,
  FormConfig,
} from '..';

export class FormBuilder {
  private _form: FormDefinition;

  constructor(initialForm: FormDefinition = nullFormDefinition) {
    this._form = initialForm || nullFormDefinition;
  }

  get form(): FormDefinition {
    return this._form;
  }

  setFormSummary(summary: FormSummary) {
    this._form = updateFormSummary(this.form, summary);
  }

  async addDocument(fileDetails: { name: string; data: Uint8Array }) {
    const { updatedForm } = await addDocument(this.form, fileDetails);
    this._form = updatedForm;
  }

  updateFormElement(
    config: FormConfig,
    formElement: FormElement,
    formData: FormElementMap
  ) {
    const updatedElement = updateFormElement(
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

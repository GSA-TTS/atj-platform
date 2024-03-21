import { nullFormDefinition, type FormDefinition } from '..';

export class FormBuilder {
  form: FormDefinition;

  constructor(initialForm: FormDefinition = nullFormDefinition) {
    this.form = initialForm || nullFormDefinition;
  }

  async addDocument(fileDetails: { name: string; data: Uint8Array }) {
    //this.form = await addDocument(this.form, fileDetails);
  }
}

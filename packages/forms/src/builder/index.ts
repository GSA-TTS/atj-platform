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
  createPattern,
  addPatternToRoot,
} from '..';

export class BlueprintBuilder {
  private _bp: Blueprint;

  constructor(initial: Blueprint = nullBlueprint) {
    this._bp = initial;
  }

  get form(): Blueprint {
    return this._bp;
  }

  setFormSummary(summary: FormSummary) {
    this._bp = updateFormSummary(this.form, summary);
  }

  async addDocument(fileDetails: { name: string; data: Uint8Array }) {
    const { updatedForm } = await addDocument(this.form, fileDetails);
    this._bp = updatedForm;
  }

  addPattern(config: FormConfig, patternType: string) {
    const pattern = createPattern(config, patternType);
    this._bp = addPatternToRoot(this.form, pattern);
    return pattern;
  }

  updatePattern(config: FormConfig, pattern: Pattern, formData: PatternMap) {
    const updatedBlueprint = updatePatternFromFormData(
      config,
      this.form,
      pattern,
      formData
    );
    if (!updatedBlueprint) {
      return false;
    }
    this._bp = updatedBlueprint;
    return true;
  }
}

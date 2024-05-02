import { type VoidResult } from '@atj/common';
import {
  type Blueprint,
  type FormConfig,
  type FormSummary,
  type Pattern,
  type PatternId,
  type PatternMap,
  addDocument,
  addPatternToRoot,
  createPattern,
  getPattern,
  nullBlueprint,
  removePatternFromBlueprint,
  updateFormSummary,
  updatePatternFromFormData,
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

  removePattern(config: FormConfig, id: PatternId) {
    this._bp = removePatternFromBlueprint(config, this._bp, id);
  }

  updatePattern(config: FormConfig, pattern: Pattern, formData: PatternMap) {
    const result = updatePatternFromFormData(
      config,
      this.form,
      pattern,
      formData
    );
    if (!result.success) {
      return false;
    }
    this._bp = result.data;
    return true;
  }

  updatePatternById(
    config: FormConfig,
    id: PatternId,
    formData: PatternMap
  ): VoidResult {
    const pattern = getPattern(this.form, id);
    const result = updatePatternFromFormData(
      config,
      this.form,
      pattern,
      formData
    );
    if (!result.success) {
      return result;
    }
    this._bp = result.data;
    return {
      success: true,
    };
  }
}

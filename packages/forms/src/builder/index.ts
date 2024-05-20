import { type VoidResult } from '@atj/common';
import {
  type Blueprint,
  type FormConfig,
  type FormErrors,
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
  constructor(
    private config: FormConfig,
    private bp: Blueprint = nullBlueprint
  ) {}

  get form(): Blueprint {
    return this.bp;
  }

  setFormSummary(summary: FormSummary) {
    this.bp = updateFormSummary(this.form, summary);
  }

  async addDocument(fileDetails: { name: string; data: Uint8Array }) {
    const { updatedForm } = await addDocument(this.form, fileDetails);
    this.bp = updatedForm;
  }

  addPattern(patternType: string) {
    const pattern = createPattern(this.config, patternType);
    this.bp = addPatternToRoot(this.form, pattern);
    return pattern;
  }

  removePattern(id: PatternId) {
    this.bp = removePatternFromBlueprint(this.config, this.bp, id);
  }

  updatePattern(pattern: Pattern, formData: PatternMap) {
    const result = updatePatternFromFormData(
      this.config,
      this.form,
      pattern,
      formData
    );
    if (!result.success) {
      return false;
    }
    this.bp = result.data;
    return true;
  }

  updatePatternById(
    id: PatternId,
    formData: PatternMap
  ): VoidResult<FormErrors> {
    const pattern = getPattern(this.form, id);
    const result = updatePatternFromFormData(
      this.config,
      this.form,
      pattern,
      formData
    );
    if (!result.success) {
      return result;
    }
    this.bp = result.data;
    return {
      success: true,
    };
  }
}

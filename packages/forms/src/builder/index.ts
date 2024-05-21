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
  addPageToPageSet,
  addPatternToPage,
  createPattern,
  getPattern,
  nullBlueprint,
  removePatternFromBlueprint,
  updateFormSummary,
  updatePatternFromFormData,
} from '..';
import { PageSetPattern } from '../patterns/pageset';

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

  addPage() {
    const newPage = createPattern(this.config, 'page');
    this.bp = addPageToPageSet(this.form, newPage);
    return newPage;
  }

  addPatternToFirstPage(patternType: string) {
    const pattern = createPattern(this.config, patternType);
    const root = this.form.patterns[this.form.root] as PageSetPattern;
    const firstPagePatternId = root.data.pages[0];
    this.bp = addPatternToPage(this.form, firstPagePatternId, pattern);
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

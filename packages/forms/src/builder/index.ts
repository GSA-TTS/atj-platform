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
  createDefaultPattern,
  getPattern,
  removePatternFromBlueprint,
  updateFormSummary,
  updatePatternFromFormData,
  createOnePageBlueprint,
  addPatternToFieldset,
  movePatternBetweenPages,
} from '..';
import { type PageSetPattern } from '../patterns/page-set/config';
import { FieldsetPattern } from '../patterns/fieldset';
import { PagePattern } from '../patterns/page/config';

export class BlueprintBuilder {
  bp: Blueprint;

  constructor(
    private config: FormConfig,
    bp?: Blueprint
  ) {
    this.bp = bp || createOnePageBlueprint();
  }

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
    const newPage = createDefaultPattern(this.config, 'page');
    this.bp = addPageToPageSet(this.form, newPage);
    return newPage;
  }

  addPatternToPage(patternType: string, pageNum: number = 0) {
    const pattern = createDefaultPattern(this.config, patternType);
    const root = this.form.patterns[this.form.root] as PageSetPattern;
    if (root.type !== 'page-set') {
      throw new Error('expected root to be a page-set');
    }
    const pagePatternId = root.data.pages[pageNum];
    this.bp = addPatternToPage(this.form, pagePatternId, pattern);

    return pattern;
  }

  movePatternBetweenPages(
    sourcePageId: PatternId,
    targetPageId: PatternId,
    patternId: PatternId,
    position: string
  ) {
    const pattern = getPattern(this.form, patternId);
    if (!pattern) {
      throw new Error(`Pattern with id ${patternId} not found.`);
    }
    const root = this.form.patterns[this.form.root] as PageSetPattern;
    if (root.type !== 'page-set') {
      throw new Error('expected root to be a page-set');
    }

    this.bp = movePatternBetweenPages(
      this.form,
      sourcePageId,
      targetPageId,
      patternId,
      position
    );

    return pattern;
  }

  addPatternToFieldset(patternType: string, fieldsetPatternId: PatternId) {
    const pattern = createDefaultPattern(this.config, patternType);
    const root = this.form.patterns[fieldsetPatternId] as FieldsetPattern;
    if (root.type !== 'fieldset') {
      throw new Error('expected pattern to be a fieldset');
    }
    this.bp = addPatternToFieldset(this.form, fieldsetPatternId, pattern);
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
      console.error('Error updating pattern', result.error);
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

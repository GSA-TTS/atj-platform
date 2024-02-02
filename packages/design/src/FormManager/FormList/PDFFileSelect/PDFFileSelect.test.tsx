/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper';
import meta, * as stories from './PDFFileSelect.stories';

describeStories(meta.title, stories);

/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper';
import meta, * as stories from './FormSummary.stories';

describeStories(meta.title, stories);

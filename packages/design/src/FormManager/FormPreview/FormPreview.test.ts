/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../test-helper';
import meta, * as stories from './FormPreview.stories';

describeStories(meta.title, stories);

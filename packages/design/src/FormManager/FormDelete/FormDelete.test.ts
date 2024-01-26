/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../test-helper';
import meta, * as stories from './FormDelete.stories';

describeStories(meta.title, stories);

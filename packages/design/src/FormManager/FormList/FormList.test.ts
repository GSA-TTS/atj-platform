/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../test-helper.js';
import meta, * as stories from './FormList.stories.js';

describeStories(meta, stories);

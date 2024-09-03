/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper.js';
import meta, * as stories from './TestInput.stories.js';

describeStories(meta, stories);

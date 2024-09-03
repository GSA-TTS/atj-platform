/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper.js';
import meta, * as stories from './PageSet.stories.js';

describeStories(meta, stories);

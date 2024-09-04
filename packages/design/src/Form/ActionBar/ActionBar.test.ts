/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../test-helper.js';
import meta, * as stories from './ActionBar.stories.js';

describeStories(meta, stories);

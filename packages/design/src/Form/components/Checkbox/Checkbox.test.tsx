/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper.js';
import meta, * as stories from './Checkbox.stories.js';

describeStories(meta, stories);

/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper';
import meta, * as stories from './Checkbox.stories';

describeStories(meta, stories);

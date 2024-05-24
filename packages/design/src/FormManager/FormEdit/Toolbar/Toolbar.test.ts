/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper';
import meta, * as stories from './Toolbar.stories';

describeStories(meta, stories);

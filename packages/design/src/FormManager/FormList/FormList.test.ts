/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../test-helper';
import meta, * as stories from './FormList.stories';

describeStories(meta, stories);

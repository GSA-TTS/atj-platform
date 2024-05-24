/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper';
import meta, * as stories from './PageSet.stories';

describeStories(meta, stories);

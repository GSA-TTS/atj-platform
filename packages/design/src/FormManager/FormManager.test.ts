/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../test-helper';
import meta, * as stories from './FormManager.stories';

describeStories(meta, stories);

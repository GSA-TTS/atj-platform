/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../test-helper';
import meta, * as stories from './AvailableFormList.stories';

describeStories(meta, stories);

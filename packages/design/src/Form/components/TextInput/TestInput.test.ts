/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper';
import meta, * as stories from './TestInput.stories';

describeStories(meta, stories);

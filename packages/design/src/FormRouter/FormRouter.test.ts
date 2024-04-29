/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../test-helper';
import meta, * as stories from './FormRouter.stories';

describeStories(meta, stories);

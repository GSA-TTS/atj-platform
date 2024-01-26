/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../test-helper';
import meta, * as stories from './Form.stories';

describeStories(meta.title, stories);

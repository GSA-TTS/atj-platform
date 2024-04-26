/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../test-helper';
import meta, * as stories from './FormEdit.stories';

describeStories(meta, stories);

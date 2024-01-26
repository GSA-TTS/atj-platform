/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../test-helper';
import meta, * as stories from './FormView.stories';

describeStories(meta.title, stories);

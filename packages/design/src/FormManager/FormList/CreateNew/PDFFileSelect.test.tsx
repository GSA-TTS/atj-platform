/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper';
import meta, * as stories from './CreateNew.stories';

describeStories(meta.title, stories);

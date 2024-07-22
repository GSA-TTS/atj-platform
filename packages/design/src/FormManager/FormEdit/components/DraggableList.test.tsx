/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper';
import meta, * as stories from './DraggableList.stories';

describeStories(meta, stories);

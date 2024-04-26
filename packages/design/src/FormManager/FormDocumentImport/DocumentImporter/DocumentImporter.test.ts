/**
 * @vitest-environment jsdom
 */
import { describeStories } from '../../../test-helper';
import meta, * as stories from './DocumentImporter.stories';

describeStories(meta, stories);

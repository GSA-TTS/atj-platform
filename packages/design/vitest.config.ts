import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';
import sharedTestConfig from '../../vitest.shared';

export default mergeConfig(viteConfig, defineConfig(sharedTestConfig));

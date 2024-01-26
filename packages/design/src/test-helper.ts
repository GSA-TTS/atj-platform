import { Store_CSFExports } from '@storybook/types';
import { ReactRenderer, composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { Entries } from 'type-fest';
import { describe, test } from 'vitest';

/**
 * Wrap the Component Story Format (CSF) exports for a component with Vitest
 * describe and test blocks.
 * @param componentName
 * @param csfExports
 */
export const describeStories = <
  // eslint-disable-next-line
  TModule extends Store_CSFExports<ReactRenderer, any>,
>(
  componentName: string,
  csfExports: TModule
) => {
  const composedStories = composeStories(csfExports);
  describe(componentName, () => {
    const entries = Object.entries(composedStories) as Entries<
      typeof composedStories
    >;
    entries.forEach(([name, Story]) => {
      test(name, async () => {
        const { container } = render(Story());
        if (Story.play) {
          await Story.play({ canvasElement: container });
        }
      });
    });
  });
};

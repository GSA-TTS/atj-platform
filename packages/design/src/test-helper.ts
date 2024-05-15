import { ReactElement } from 'react';
import { describe, test } from 'vitest';
import { type ReactRenderer, composeStories, Meta } from '@storybook/react';
import { ComponentAnnotations, type Store_CSFExports } from '@storybook/types';
import { render } from '@testing-library/react';

type Story = {
  (): ReactElement;
  play?: (args: { canvasElement: HTMLElement }) => Promise<void>;
};

/**
 * Wrap the Component Story Format (CSF) exports for a component with Vitest
 * describe and test blocks.
 * @param componentName
 * @param csfExports
 */
export const describeStories = (
  meta: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  csfExports: any // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const composedStories = composeStories(csfExports);
  describe(`Storybook stories: ${meta.title || meta.id}`, () => {
    type Entry = [string, Story];
    const entries = Object.entries(composedStories) as Entry[];
    entries.forEach(([name, Story]) => {
      test(name as string, async () => {
        const { container } = render(Story());
        if (Story.play) {
          await Story.play({ canvasElement: container });
        }
      });
    });
  });
};

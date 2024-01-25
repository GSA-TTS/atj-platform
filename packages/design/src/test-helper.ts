import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe, test } from 'vitest';

export const describeStories = <T>(
  componentName: string,
  stories: Parameters<typeof composeStories>[0]
) => {
  const composedStories = composeStories(stories);
  describe(componentName, () => {
    Object.entries(composedStories).forEach(([name, story]) => {
      test(name, async () => {
        render((story as any)());
      });
    });
  });
};

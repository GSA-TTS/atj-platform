import type { Meta, StoryObj } from '@storybook/react';

import { type RichTextPattern } from '@atj/forms/src/patterns/rich-text';
import { en as message } from '@atj/common/src/locales/en/app';

import { createPatternEditStoryMeta } from '../common/story-helper';
import FormEdit from '../../';
import { expect, userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

const pattern: RichTextPattern = {
  id: '1',
  type: 'rich-text',
  data: {
    text: '<h2>How to Begin:</h2><p>Filling out and submitting the application is the first step in a lengthy process. You will be asked to provide details about yourself, your reasons for seeking pardon, your current activities, challenges you may be facing because of your conviction, information about your conviction and other criminal history, if any, and letters of support.</p><p>It is not required, but it may be helpful to gather the following documents, if available, before you start:</p><ol><li>Presentence investigation report<br>This report is prepared by the U.S. Probation Office to help the court with sentencing.</li><li>Judgment<br>This document shows what sentence the court gave you.</li><li>Statement of reasons<br>This document gives the court\u2019s reasons for the sentence (not applicable in D.C. Code or military cases).</li><li>Indictment or Information<br>These documents list the charges against you.</li><li>Case docket report<br>The docket lists all the events in the case.</li></ol>',
  },
};

const storyConfig: Meta = {
  title: 'Edit components/RichTextPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;
export default storyConfig;

export const Basic: StoryObj<typeof FormEdit> = {};

export const Formatting: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    userEvent.setup();

    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByText(message.patterns.richText.displayName)
    );

    const heading1 = canvas.getByRole('button', {
      name: 'Heading 1',
    });
    await userEvent.click(heading1);
    await expect(
      canvas.getByText('How to Begin:', { selector: 'h1' })
    ).toBeInTheDocument();
    await userEvent.click(heading1);
    await expect(
      canvas.queryByText('How to Begin:', { selector: 'h1' })
    ).not.toBeInTheDocument();

    const bulletList = canvas.getByRole('button', {
      name: 'Bullet list',
    });
    await userEvent.click(bulletList);
    const ulElement = canvas.getAllByRole('list')[0]; // getByRole will return the first match
    const firstListItem = ulElement.firstChild;
    await expect(firstListItem).toHaveTextContent('how to begin');
  },
};

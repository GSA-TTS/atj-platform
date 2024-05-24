import React from 'react';
import { type Decorator, type Meta } from '@storybook/react';

import { type Blueprint, type Pattern } from '@atj/forms';

import {
  createSimpleTestBlueprint,
  createTestFormManagerContext,
  createTestSession,
} from '../../../../test-form';

import FormEdit from '../../../FormEdit';
import { FormManagerProvider } from '../../../store';
import { expect, userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

type PatternEditStoryMetaOptions = {
  pattern?: Pattern;
  blueprint?: Blueprint;
  decorators: Decorator[];
};

export const createPatternEditStoryMeta = ({
  pattern,
  blueprint,
  decorators = [],
}: PatternEditStoryMetaOptions): Meta<typeof FormEdit> => {
  const form = blueprint ?? createSimpleTestBlueprint(pattern as Pattern);
  return {
    title: 'Untitled pattern edit story',
    component: FormEdit,
    decorators: [
      (Story, args) => (
        <FormManagerProvider
          context={createTestFormManagerContext()}
          session={createTestSession({
            form,
          })}
        >
          <Story {...args} />
        </FormManagerProvider>
      ),
      ...decorators,
    ],
    args: {},
    tags: ['autodocs'],
  };
};

export const testUpdateFormFieldOnSubmit = async (
  canvasElement: HTMLElement,
  displayName: string,
  fieldLabel: string,
  updatedLabel: string
): Promise<void> => {
  const canvas = within(canvasElement);
  return testUpdateFormFieldOnSubmitByElement(
    canvasElement,
    await canvas.findByLabelText(displayName),
    fieldLabel,
    updatedLabel
  );
};

export const testUpdateFormFieldOnSubmitByElement = async (
  canvasElement: HTMLElement,
  element: HTMLElement,
  fieldLabel: string,
  updatedValue: string
): Promise<void> => {
  userEvent.setup();
  const canvas = within(canvasElement);

  await userEvent.click(element);
  const input = canvas.getByLabelText(fieldLabel);

  // Enter new text for the field
  await userEvent.clear(input);
  await userEvent.type(input, updatedValue);

  const form = input?.closest('form');
  /**
   * The <enter> key behavior outside of Storybook submits the form, which commits the pending edit.
   * Here, we want to simulate the <enter> keypress in the story since Storybook manipulates
   * the default behavior and does not register the enter key if it's in the `userEvent.type` function arg.
   */
  form?.requestSubmit();

  await expect(
    (await canvas.findAllByText(updatedValue)).length
  ).toBeGreaterThan(0);
};

export const testEmptyFormLabelError = async (
  canvasElement: HTMLElement,
  displayName: string,
  fieldLabel: string,
  errorText: string
): Promise<void> => {
  userEvent.setup();

  const canvas = within(canvasElement);

  await userEvent.click(await canvas.findByLabelText(displayName));
  const input = canvas.getByLabelText(fieldLabel);

  // Clear input, remove focus, and wait for error
  await userEvent.clear(input);
  input.blur();

  await expect(await canvas.findByText(errorText)).toBeInTheDocument();
};

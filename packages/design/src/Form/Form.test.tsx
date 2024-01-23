import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect } from '@storybook/test';
import { composeStory } from '@storybook/react';
import { describe, it } from 'vitest';

import Meta, { FormTest } from './Form.stories';

const FormComposed = composeStory(FormTest, Meta);

describe('Form', () => {
  it('renders', () => {
    render(<FormComposed />);

    const buttonElement = screen.getByRole('button', {
      name: 'Submit',
    });

    fireEvent.click(buttonElement);

    const isFormValid = screen.getByLabelText('invalid-form');
    expect(isFormValid).toBeInTheDocument();
  });
});

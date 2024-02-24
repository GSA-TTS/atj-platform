import deepEqual from 'deep-equal';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  applyPromptResponse,
  createPrompt,
  type FormConfig,
  type FormSession,
  type Prompt,
  type PromptPart,
} from '@atj/forms';

import ActionBar from './ActionBar';
import { defaultFormElementComponent } from '../config';

export type FormElementComponent<T extends PromptPart = PromptPart> =
  React.ComponentType<{
    prompt: T;
  }>;

const usePrompt = (
  initialPrompt: Prompt,
  config: FormConfig,
  session: FormSession
) => {
  const [prompt, _setPrompt] = useState<Prompt>(initialPrompt);
  const setPrompt = (newPrompt: Prompt) => {
    if (!deepEqual(newPrompt, prompt)) {
      _setPrompt(newPrompt);
    }
  };
  const updatePrompt = (data: Record<string, string>) => {
    const result = applyPromptResponse(
      config,
      session,
      {
        action: 'submit',
        data,
      },
      { validate: true }
    );
    if (!result.success) {
      console.warn('Error applying prompt response...', result.error);
      return;
    }
    const prompt = createPrompt(config, result.data, { validate: true });
    setPrompt(prompt);
  };
  return { prompt, updatePrompt };
};

export default function Form({
  config,
  session,
  onSubmit,
}: {
  config: FormConfig;
  session: FormSession;
  onSubmit?: (data: Record<string, string>) => void;
}) {
  const initialPrompt = createPrompt(config, session, { validate: false });
  const { prompt, updatePrompt } = usePrompt(initialPrompt, config, session);

  const formMethods = useForm<Record<string, string>>({});

  /**
   * Regenerate the prompt whenever the form changes.
  const allFormData = formMethods.watch();
  useEffect(() => {
    updatePrompt(allFormData);
  }, [allFormData]);
  */

  return (
    <FormProvider {...formMethods}>
      <form
        className="previewForm"
        onSubmit={formMethods.handleSubmit(async data => {
          updatePrompt(data);
          if (onSubmit) {
            console.log('Submitting form...');
            onSubmit(data);
          } else {
            console.warn('Skipping form submission...');
          }
        })}
      >
        <fieldset className="usa-fieldset">
          {prompt.parts.map((promptPart, index) => {
            const Component = defaultFormElementComponent[promptPart.type];
            return <Component key={index} prompt={promptPart} />;
          })}
          {/* Add submit button or other controls as needed */}
        </fieldset>
        <ActionBar actions={prompt.actions} />
      </form>
    </FormProvider>
  );
}

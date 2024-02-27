import deepEqual from 'deep-equal';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  applyPromptResponse,
  createPrompt,
  type FormConfig,
  type FormSession,
  type Pattern,
  type Prompt,
  type PromptPart,
} from '@atj/forms';

import ActionBar from './ActionBar';

export type FormUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  uswdsRoot: `${string}/`;
};

export type ComponentForPattern<T extends Pattern = Pattern<unknown>> = Record<
  string,
  FormElementComponent<T>
>;

export type FormElementComponent<T extends Pattern = Pattern<unknown>> =
  React.ComponentType<{
    pattern: T;
    children?: React.ReactNode;
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
  context,
  session,
  onSubmit,
}: {
  context: FormUIContext;
  session: FormSession;
  onSubmit?: (data: Record<string, string>) => void;
}) {
  const initialPrompt = createPrompt(context.config, session, {
    validate: false,
  });
  const { prompt, updatePrompt } = usePrompt(
    initialPrompt,
    context.config,
    session
  );

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
          {prompt.parts
            .map((part, index) => {
              return (
                <PromptComponent
                  key={index}
                  context={context}
                  promptPart={part}
                />
              );
            })
            .filter(a => a)}
          {/* Add submit button or other controls as needed */}
        </fieldset>
        <ActionBar actions={prompt.actions} />
      </form>
    </FormProvider>
  );
}

const PromptComponent = ({
  context,
  promptPart,
}: {
  context: FormUIContext;
  promptPart: PromptPart;
}) => {
  const Component = context.components[promptPart.pattern.type];
  return (
    <Component pattern={promptPart.pattern}>
      {promptPart.children?.map((child, index) => (
        <PromptComponent key={index} context={context} promptPart={child} />
      ))}
    </Component>
  );
};

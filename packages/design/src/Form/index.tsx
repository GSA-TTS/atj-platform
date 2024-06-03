import deepEqual from 'deep-equal';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  applyPromptResponse,
  createPrompt,
  type FormConfig,
  type FormSession,
  type PatternProps,
  type Prompt,
  type PromptComponent,
} from '@atj/forms';

import ActionBar from './ActionBar';

export type FormUIContext = {
  config: FormConfig;
  components: ComponentForPattern;
  uswdsRoot: `${string}/`;
};

export type ComponentForPattern<T extends PatternProps = PatternProps> = Record<
  string,
  PatternComponent<T>
>;

export type PatternComponent<T extends PatternProps = PatternProps<unknown>> =
  React.ComponentType<
    T & {
      children?: React.ReactNode;
    }
  >;

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
    const result = applyPromptResponse(config, session, {
      action: 'submit',
      data,
    });
    if (!result.success) {
      console.warn('Error applying prompt response...', result.error);
      return;
    }
    const prompt = createPrompt(config, result.data, { validate: true });
    setPrompt(prompt);
  };
  return { prompt, setPrompt, updatePrompt };
};

export default function Form({
  context,
  session,
  onSubmit,
  isPreview, // ideally this should be removed. just here now for the FFP demo
}: {
  context: FormUIContext;
  session: FormSession;
  onSubmit?: (data: Record<string, string>) => void;
  isPreview?: boolean;
}) {
  const initialPrompt = createPrompt(context.config, session, {
    validate: false,
  });
  const { prompt, setPrompt, updatePrompt } = usePrompt(
    initialPrompt,
    context.config,
    session
  );

  // So the preview view can update the session, regen the prompt.
  // This feels smelly.
  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

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
      <div className="preview grid-container">
        <div className="grid-row">
          <div className="grid-col-12 usa-prose">
            {!isPreview ? (
              <form
                className="usa-form usa-form--large margin-bottom-3"
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
                <FormContents context={context} prompt={prompt} />
              </form>
            ) : (
              <div className="formContentWrapper">
                <FormContents context={context} prompt={prompt} />
              </div>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

const FormContents = ({
  context,
  prompt,
}: {
  context: FormUIContext;
  prompt: Prompt;
}) => {
  return (
    <>
      {false && (
        <fieldset className="usa-fieldset width-full">
          <legend className="usa-legend text-bold">
            Request to Change Name
          </legend>
          <div className="usa-form-group">
            <div className="usa-form-group">
              <fieldset className="usa-fieldset width-full">
                <legend className="usa-legend text-bold text-uppercase line-height-body-4">
                  County where you live
                </legend>
                <label className="usa-label">Name of your county *</label>
                <input
                  className="usa-input"
                  id="input-users1_address_line_one"
                  name="users1_address_line_one"
                  type="text"
                  aria-describedby="input-message-users1_address_line_one"
                  value=""
                />
              </fieldset>
            </div>
          </div>

          <div className="usa-form-group">
            <div className="usa-form-group">
              <fieldset className="usa-fieldset width-full">
                <legend className="usa-legend text-bold text-uppercase line-height-body-4">
                  Your current name
                </legend>
                <label className="usa-label">First name *</label>
                <input
                  className="usa-input"
                  id="input-users1_first_name"
                  name="users1_first_name"
                  type="text"
                  aria-describedby="input-message-users1_first_name"
                  value=""
                />
                <label className="usa-label">Middle name *</label>
                <input
                  className="usa-input"
                  id="input-users1_middle_name"
                  name="users1_middle_name"
                  type="text"
                  aria-describedby="input-message-users1_middle_name"
                  value=""
                />
                <label className="usa-label">Last name *</label>
                <input
                  className="usa-input"
                  id="input-users1_last_name"
                  name="users1_last_name"
                  type="text"
                  aria-describedby="input-message-users1_last_name"
                  value=""
                />
              </fieldset>
              <fieldset className="usa-fieldset width-full">
                <p>
                  To ask the court to change your name, you must fill out this
                  form, and:
                </p>
                <ul>
                  <li>
                    Attach a certified copy of your birth certificate and a copy
                    of your photo ID, and
                  </li>
                  <li>
                    File your form and attachements in the same county where you
                    live.
                  </li>
                </ul>
              </fieldset>
            </div>
          </div>
        </fieldset>
      )}

      <fieldset className="usa-fieldset width-full">
        {prompt.components.map((component, index) => {
          return (
            <PromptComponent
              key={index}
              context={context}
              component={component}
            />
          );
        })}
      </fieldset>
      <ActionBar actions={prompt.actions} />
    </>
  );
};

const PromptComponent = ({
  context,
  component,
}: {
  context: FormUIContext;
  component: PromptComponent;
}) => {
  const Component = context.components[component.props.type];
  return (
    <Component {...component.props}>
      {component.children?.map((childPromptComponent, index) => {
        return (
          <PromptComponent
            key={index}
            context={context}
            component={childPromptComponent}
          />
        );
      })}
    </Component>
  );
};

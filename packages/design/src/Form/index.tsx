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
  console.log(JSON.stringify(prompt, null, 2));
  return (
    <FormProvider {...formMethods}>
      <div className="preview">
        <div className="grid-row">
          <nav className="sideNav tablet:grid-col-3 margin-bottom-4 tablet:margin-bottom-0">
            <ul className="usa-sidenav">
              <li className="usa-sidenav__item">
                <a href="">County</a>
              </li>
              <li className="usa-sidenav__item">
                <a className="usa-current" href="">
                  Current name
                </a>
              </li>
              <ul className="usa-sidenav__sublist">
                <li className="usa-sidenav__item">
                  <a className="usa-current" href="">
                    First name
                  </a>
                </li>
                <li className="usa-sidenav__item">
                  <a href="">Middle name</a>
                </li>
                <li className="usa-sidenav__item">
                  <a href="">Last name</a>
                </li>
              </ul>
              <li className="usa-sidenav__item">
                <a href="">Declarations</a>
              </li>
              <li className="usa-sidenav__item">
                <a href="">Address</a>
              </li>
              <li className="usa-sidenav__item">
                <a href="">Telephone</a>
              </li>
              <li className="usa-sidenav__item">
                <a href="">Date of Birth</a>
              </li>
              <li className="usa-sidenav__item">
                <a href="">Name at Birth</a>
              </li>
            </ul>
          </nav>
          <div className="grid-col-9 usa-prose">
            <form
              className="previewForm usa-form usa-form--large margin-bottom-3"
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
              {false && (
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Request to Change Name
                  </legend>
                  <div className="usa-form-group">
                    <div className="usa-form-group">
                      <fieldset className="usa-fieldset">
                        <legend className="usa-legend usa-legend--large">
                          County where you live
                        </legend>
                        <label className="usa-label">
                          Name of your county *
                        </label>
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
                      <fieldset className="usa-fieldset">
                        <legend className="usa-legend usa-legend--large">
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
                      <fieldset className="usa-fieldset">
                        <p>
                          To ask the court to change your name, you must fill
                          out this form, and:
                        </p>
                        <ul>
                          <li>
                            Attach a certified copy of your birth certificate
                            and a copy of your photo ID, and
                          </li>
                          <li>
                            File your form and attachements in the same county
                            where you live.
                          </li>
                        </ul>
                      </fieldset>
                    </div>
                  </div>
                </fieldset>
              )}

              <fieldset className="usa-fieldset">
                {prompt.parts.map((part, index) => {
                  return (
                    <PromptComponent
                      key={index}
                      context={context}
                      promptPart={part}
                    />
                  );
                })}
              </fieldset>
              <ActionBar actions={prompt.actions} />
            </form>
          </div>
        </div>
      </div>
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
      {promptPart.children?.map((child, index) => {
        return (
          <PromptComponent key={index} context={context} promptPart={child} />
        );
      })}
    </Component>
  );
};

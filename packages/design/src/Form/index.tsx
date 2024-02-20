import deepEqual from 'deep-equal';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  applyPromptResponse,
  createPrompt,
  type FormConfig,
  type FormSession,
  type Prompt,
} from '@atj/forms';

import PromptSegment from './PromptSegment';
import ActionBar from './ActionBar';

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
          {prompt.parts.map((promptPart, index) => (
            <PromptSegment key={index} promptPart={promptPart}></PromptSegment>
          ))}
          {/* Add submit button or other controls as needed */}
        </fieldset>
        <ActionBar actions={prompt.actions} />
      </form>
    </FormProvider>
  );
}

/*
export const FormFieldsetUnwired = ({ fields }: { fields: Field[] }) => {
  return (
    <fieldset className="usa-fieldset">
      <legend className="usa-legend usa-legend--large">
        UD 105 - Unlawful Detainer Form
      </legend>
      {fields.map(field => {
        // Use 'tag' for 'select' and 'textarea', 'type' for others
        const fieldType =
          field.tag === 'select' ||
          field.tag === 'textarea' ||
          field.tag === 'p' ||
          field.tag === 'h2' ||
          field.tag === 'h3' ||
          field.tag === 'ul'
            ? field.tag
            : field.type;

        switch (fieldType) {
          case 'text':
            return <TextField key={field.id} field={field} />;
          case 'boolean':
            return <BooleanField key={field.id} field={field} />;
          case 'checkbox':
            return <CheckBoxField key={field.id} field={field} />;
          case 'select':
            return <SelectField key={field.id} field={field} />;
          case 'radio':
            return <RadioField key={field.id} field={field} />;
          case 'date':
            return <DateField key={field.id} field={field} />;
          case 'textarea':
            return <TextareaField key={field.id} field={field} />;
          case 'p':
            return <ParagraphBlock key={field.id} field={field} />;
          case 'h2':
            return <Header3Block key={field.id} field={field} />;
          case 'h3':
            return <Header3Block key={field.id} field={field} />;
          case 'ul':
            return <UnorderedList key={field.id} field={field} />;
          default:
            return null;
        }
      })}
    </fieldset>
  );
};
*/

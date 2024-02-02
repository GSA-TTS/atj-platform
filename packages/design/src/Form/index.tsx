import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  createFormContext,
  createPrompt,
  type FormDefinition,
} from '@atj/forms';

import PromptSegment from './PromptSegment';
import ActionBar from './ActionBar';

export default function Form({
  form,
  onSubmit,
}: {
  form: FormDefinition;
  onSubmit?: (data: Record<string, string>) => void;
}) {
  const context = createFormContext(form);
  const prompt = createPrompt(context);

  const formMethods = useForm<Record<string, string>>({});
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(async data => {
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

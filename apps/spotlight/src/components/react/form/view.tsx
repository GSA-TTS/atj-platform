import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Prompt, createFormContext, createPrompt } from '@atj/forms';
import { submitForm } from '@atj/form-service';

import { PromptSegment } from './prompts';

// Assuming this is the structure of your JSON data
export interface Field {
  type: 'text';
  id: string;
  name: string;
  label: string;
  required: boolean;
  initial?: string;
}

export const FormViewById = ({ formId }: { formId: string }) => {
  // Fallback to hardcoded data if a magic ID is chosen.
  const form = getFormFromStorage(window.localStorage, formId);
  if (!form) {
    return 'null form retrieved from storage';
  }
  const context = createFormContext(form);
  const prompt = createPrompt(context);

  return (
    <FormView
      prompt={prompt}
      onSubmit={async data => {
        const submission = await submitForm(
          { storage: window.localStorage },
          formId,
          data
        );
        if (submission.success) {
          submission.data.forEach(document => {
            downloadPdfDocument(document.fileName, document.data);
          });
        } else {
          console.error(submission.error);
        }
      }}
    />
  );
};

export const FormView = ({
  prompt,
  onSubmit,
}: {
  prompt: Prompt;
  onSubmit?: (data: Record<string, string>) => void;
}) => {
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
          {prompt.map((promptPart, index) => (
            <PromptSegment key={index} promptPart={promptPart}></PromptSegment>
          ))}
          {/* Add submit button or other controls as needed */}
        </fieldset>
        <ButtonBar />
      </form>
    </FormProvider>
  );
};

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

const ButtonBar = () => {
  return (
    <div>
      <button className="usa-button">Submit</button>
    </div>
  );
};

export const downloadPdfDocument = (fileName: string, pdfData: Uint8Array) => {
  const blob = new Blob([pdfData], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

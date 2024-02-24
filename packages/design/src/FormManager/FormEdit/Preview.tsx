import classNames from 'classnames';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  type FormConfig,
  type FormElement,
  type Prompt,
  createNullPrompt,
  FormElementId,
  FormDefinition,
  getRootFormElement,
  getFormElements,
} from '@atj/forms';

import { FormElementComponent } from '../../Form';
import { type FormUIContext } from '../../config';

type PreviewComponentProps<
  P extends Prompt = Prompt,
  F extends FormElement = FormElement,
> = {
  config: FormConfig;
  Component: FormElementComponent<P>;
  element: F;
  onSelected: (id: string) => void;
  isSelected: boolean;
};

const PreviewComponent = ({
  config,
  Component,
  element,
  onSelected,
  isSelected,
}: PreviewComponentProps) => {
  const nullPrompt = createNullPrompt({ config, element });
  return (
    <div
      className={classNames('tablet:grid-col-12', {
        'bg-primary-lighter': isSelected,
      })}
      onClick={event => {
        event.stopPropagation();
        onSelected(element.id);
      }}
      //onKeyDown={handleKeyDown}
      role="button"
      aria-pressed={isSelected}
      aria-label="Select this pattern"
      tabIndex={0}
    >
      {nullPrompt.parts.map((pattern, index) => (
        <Component key={index} prompt={pattern} />
      ))}

      <div style={{ backgroundColor: 'white', padding: '1rem' }}>Hello</div>
    </div>
  );
};

export const PreviewForm = ({
  uiContext,
  form,
  onFormElementSelected,
}: {
  uiContext: FormUIContext;
  form: FormDefinition;
  onFormElementSelected: (elementId: FormElementId) => void;
}) => {
  const formMethods = useForm<Record<string, string>>({});
  const [selectedId, setSeleectedId] = useState<FormElementId>();
  const onSelected = (id: FormElementId) => {
    setSeleectedId(id);
    onFormElementSelected(id);
  };
  const root = getRootFormElement(form);
  const elements = getFormElements(form, root.data.elements);
  return (
    <FormProvider {...formMethods}>
      {elements.map(element => {
        const Component = uiContext.components[element.type];
        return (
          <PreviewComponent
            key={element.id}
            config={uiContext.config}
            Component={Component}
            element={element}
            onSelected={onSelected}
            isSelected={selectedId === element.id}
          />
        );
      })}
    </FormProvider>
  );
};

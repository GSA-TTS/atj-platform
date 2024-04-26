import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { type FormConfig, nullBlueprint } from '@atj/forms';
import { FormService } from '@atj/form-service';

import { type ComponentForPattern } from '../Form';

import FormDelete from './FormDelete';
import { FormDocumentImport } from './FormDocumentImport';
import FormEdit from './FormEdit';
import { type EditComponentForPattern } from './FormEdit/types';
import FormList from './FormList';
import { FormManagerLayout, NavPage } from './FormManagerLayout';
import { FormPreview } from './FormPreview';
import { FormManagerProvider } from './store';

export type FormManagerContext = {
  baseUrl: `${string}/`;
  components: ComponentForPattern;
  config: FormConfig;
  editComponents: EditComponentForPattern;
  formService: FormService;
  uswdsRoot: `${string}/`;
};

type FormManagerProps = {
  context: FormManagerContext;
};

export default function FormManager({ context }: FormManagerProps) {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          Component={() => (
            <FormManagerProvider context={context} form={nullBlueprint}>
              <FormManagerLayout>
                <FormList formService={context.formService} />
              </FormManagerLayout>
            </FormManagerProvider>
          )}
        />
        <Route
          path="/:formId/preview"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const form = context.formService.getForm(formId);
            if (!form.success) {
              return <div>Error loading form preview</div>;
            }
            return (
              <FormManagerProvider context={context} form={form.data}>
                <FormManagerLayout>
                  <FormPreview />
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path="/:formId/upload"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const result = context.formService.getForm(formId);
            if (!result.success) {
              return <div>Form not found</div>;
            }
            const form = result.data;
            return (
              <FormManagerProvider context={context} form={form}>
                <FormManagerLayout
                  step={NavPage.upload}
                  back={`#/`}
                  next={`#/${formId}/create`}
                  preview={`#/${formId}/preview`}
                >
                  <FormDocumentImport
                    context={context}
                    baseUrl={context.baseUrl}
                    formId={formId}
                    formService={context.formService}
                  />
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path="/:formId/create"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const result = context.formService.getForm(formId);
            if (!result.success) {
              return <div>Form not found</div>;
            }
            const form = result.data;
            return (
              <FormManagerProvider context={context} form={form}>
                <FormManagerLayout
                  step={NavPage.create}
                  back={`#/${formId}/upload`}
                  next={`#/${formId}/configure`}
                  preview={`#/${formId}/preview`}
                >
                  <FormEdit formId={formId} />
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path="/:formId/configure"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const result = context.formService.getForm(formId);
            if (!result.success) {
              return 'Form not found';
            }
            const form = result.data;
            return (
              <FormManagerProvider context={context} form={form}>
                <FormManagerLayout
                  step={NavPage.configure}
                  back={`#/${formId}/create`}
                  next={`#/${formId}/publish`}
                  preview={`#/${formId}/preview`}
                >
                  Publish
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path="/:formId/publish"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const result = context.formService.getForm(formId);
            if (!result.success) {
              return 'Form not found';
            }
            const form = result.data;
            return (
              <FormManagerProvider context={context} form={form}>
                <FormManagerLayout
                  step={NavPage.publish}
                  back={`#/${formId}/configure`}
                  close={`#/`}
                  preview={`#/${formId}/preview`}
                >
                  Publish
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path="/:formId/delete"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            return (
              <FormDelete formId={formId} formService={context.formService} />
            );
          }}
        />
      </Routes>
    </HashRouter>
  );
}

import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import FormDelete from './FormDelete';
import FormEdit from './FormEdit';
import FormList from './FormList';
import { FormPreviewById } from './FormPreview';
import { FormDocumentImport } from './import-document';
import { type FormEditUIContext } from './FormEdit/types';
import { FormManagerLayout, NavPage } from './FormManagerLayout';
import { FormEditProvider } from './store';

type FormManagerProps = {
  context: FormEditUIContext;
};

export default function FormManager({ context }: FormManagerProps) {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          Component={() => (
            <FormManagerLayout>
              <FormList
                baseUrl={context.baseUrl}
                formService={context.formService}
              />
            </FormManagerLayout>
          )}
        />
        <Route
          path="/:formId"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            return (
              <FormPreviewById
                context={context}
                formId={formId}
                formService={context.formService}
              />
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
              <FormEditProvider context={context} form={form}>
                <FormManagerLayout
                  step={NavPage.create}
                  back={`#/`}
                  next={`#/${formId}/configure`}
                >
                  <FormEdit formId={formId} />
                </FormManagerLayout>
              </FormEditProvider>
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
              <FormEditProvider context={context} form={form}>
                <FormManagerLayout
                  step={NavPage.configure}
                  back={`#/${formId}/create`}
                  next={`#/${formId}/publish`}
                >
                  Publish
                </FormManagerLayout>
              </FormEditProvider>
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
              <FormEditProvider context={context} form={form}>
                <FormManagerLayout
                  step={NavPage.publish}
                  back={`#/${formId}/configure`}
                  close={`#/`}
                >
                  Publish
                </FormManagerLayout>
              </FormEditProvider>
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
        <Route
          path="/:formId/import-document"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            return (
              <FormDocumentImport
                context={context}
                baseUrl={context.baseUrl}
                formId={formId}
                formService={context.formService}
              />
            );
          }}
        />
      </Routes>
    </HashRouter>
  );
}

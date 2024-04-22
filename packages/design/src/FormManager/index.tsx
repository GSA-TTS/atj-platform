import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { type FormService } from '@atj/form-service';

import FormDelete from './FormDelete';
import FormEdit from './FormEdit';
import FormList from './FormList';
import { FormPreviewById } from './FormPreview';
import { FormDocumentImport } from './import-document';
import { type FormEditUIContext } from './FormEdit/types';
import { FormManagerLayout, NavPage } from './FormManagerLayout';
import { FormEditProvider } from './store';

export default function FormManager({
  context,
  baseUrl,
  formService,
}: {
  context: FormEditUIContext;
  baseUrl: string;
  formService: FormService;
}) {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          Component={() => (
            <FormManagerLayout>
              <FormList baseUrl={baseUrl} formService={formService} />
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
                formService={formService}
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
            const result = formService.getForm(formId);
            if (!result.success) {
              return 'Form not found';
            }
            const form = result.data;
            return (
              <FormEditProvider context={context} form={form}>
                <FormManagerLayout
                  step={NavPage.create}
                  back={`#/`}
                  next={`#/${formId}/configure`}
                >
                  <FormEdit formId={formId} formService={formService} />
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
            const result = formService.getForm(formId);
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
            const result = formService.getForm(formId);
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
            return <FormDelete formId={formId} formService={formService} />;
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
                baseUrl={baseUrl}
                formId={formId}
                formService={formService}
              />
            );
          }}
        />
      </Routes>
    </HashRouter>
  );
}

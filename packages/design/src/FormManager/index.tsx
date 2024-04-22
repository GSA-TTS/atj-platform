import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { type FormConfig } from '@atj/forms';

import { type ComponentForPattern } from '../Form';

import FormDelete from './FormDelete';
import FormEdit from './FormEdit';
import FormList from './FormList';
import { FormPreviewById } from './FormPreview';
import { FormDocumentImport } from './import-document';
import { FormManagerLayout, NavPage } from './FormManagerLayout';
import { FormEditProvider } from './store';

import { FormService } from '@atj/form-service';
import { type EditComponentForPattern } from './FormEdit/types';

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

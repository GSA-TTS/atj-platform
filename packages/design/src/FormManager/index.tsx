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
            <FormManagerLayout uswdsRoot={context.uswdsRoot}>
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
          path="/:formId/edit"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            return (
              <FormManagerLayout
                uswdsRoot={context.uswdsRoot}
                step={NavPage.configure}
                back={`#/`}
                next={`#/${formId}/publish`}
              >
                <FormEdit
                  context={context}
                  formId={formId}
                  formService={formService}
                />
              </FormManagerLayout>
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
            return (
              <FormManagerLayout
                uswdsRoot={context.uswdsRoot}
                step={NavPage.publish}
                back={`#/${formId}/edit`}
                close={`#/`}
              >
                Publish
              </FormManagerLayout>
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

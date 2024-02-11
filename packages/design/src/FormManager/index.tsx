import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { type FormConfig } from '@atj/forms';
import { type FormService } from '@atj/form-service';

import FormDelete from './FormDelete';
import FormEdit from './FormEdit';
import FormList from './FormList';
import { FormViewById } from './FormPreview';
import { FormDocumentImport } from './import-document';
import { FormUIContext } from '../config';

export default function FormManager({
  context,
  baseUrl,
  formService,
}: {
  context: FormUIContext;
  baseUrl: string;
  formService: FormService;
}) {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          Component={() => (
            <FormList baseUrl={baseUrl} formService={formService} />
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
              <FormViewById
                config={config}
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
              <FormEdit
                context={context}
                formId={formId}
                formService={formService}
              />
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
                config={config}
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

import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { createBrowserFormService } from '@atj/form-service';

import FormDelete from './FormDelete';
import FormEdit from './FormEdit';
import FormList from './FormList';
import { FormViewById } from './FormView';
import { FormDocumentImport } from './import-document';

export const FormSection = () => {
  const formService = createBrowserFormService();
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          Component={() => <FormList formService={formService} />}
        />
        <Route
          path="/:formId"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            return <FormViewById formId={formId} formService={formService} />;
          }}
        />
        <Route
          path="/:formId/edit"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            return <FormEdit formId={formId} formService={formService} />;
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
            return <FormDocumentImport formId={formId} />;
          }}
        />
      </Routes>
    </HashRouter>
  );
};

import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { FormDelete } from './delete';
import { FormEdit } from './edit';
import { FormList } from './list';
import { FormView } from './view';

export const FormSection = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={FormList} />
        <Route
          path="/:formId"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            return <FormView formId={formId} />;
          }}
        />
        <Route
          path="/:formId/edit"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            return <FormEdit formId={formId} />;
          }}
        />
        <Route
          path="/:formId/delete"
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            return <FormDelete formId={formId} />;
          }}
        />
      </Routes>
    </HashRouter>
  );
};

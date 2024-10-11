import React, { type ReactElement } from 'react';
import { HashRouter, Route, Routes, useParams } from 'react-router-dom';

import { type FormService } from '@atj/forms';
import { useRouteParams } from '../hooks/route-params.js';

// Wrapper around Form that includes a client-side router for loading forms.
type FormRouterProps = {
  children: (props: {
    id: string;
    route: {
      params: qs.ParsedQs;
      url: string;
    };
  }) => ReactElement;
  formService: FormService;
};

export const FormRouter = ({ children }: FormRouterProps) => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/:id"
          Component={() => {
            const { id } = useParams();
            const route = useRouteParams();
            if (id === undefined) {
              return <div>id is undefined</div>;
            }
            return children({ id, route });
          }}
        />
      </Routes>
    </HashRouter>
  );
};

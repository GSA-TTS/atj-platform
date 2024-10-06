import React, { type ReactElement } from 'react';
import { HashRouter, Route, Routes, useParams } from 'react-router-dom';

import { type FormService } from '@atj/forms';
import { useRouteParams } from '../hooks/route-params.js';

// Wrapper around Form that includes a client-side router for loading forms.
type FormRouterProps = {
  children: (props: {
    id: string;
    routeParams: qs.ParsedQs;
    pathname: string;
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
            const { routeParams, pathname } = useRouteParams();
            if (id === undefined) {
              return <div>id is undefined</div>;
            }
            return children({ id, routeParams, pathname });
          }}
        />
      </Routes>
    </HashRouter>
  );
};

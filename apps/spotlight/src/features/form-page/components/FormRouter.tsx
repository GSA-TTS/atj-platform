import React, { useEffect, type ReactElement } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { type AppContext } from '../../../context.js';
import { useRouteParams } from '../hooks/route-params.js';
import { useStore } from '../state.js';

// Wrapper around Form that includes a client-side router for loading forms.
type FormRouterProps = {
  children: (props: {}) => ReactElement;
  appContext: AppContext;
};

export const FormRouter = ({ children }: FormRouterProps) => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/:id"
          Component={() => {
            const { initialize } = useStore();
            //const { id } = useParams();
            const id = 'cd2817f0-70cd-4ff4-8c04-135f8231417b';
            const route = useRouteParams();
            useEffect(() => {
              if (id !== undefined) {
                initialize({
                  formId: id,
                  route,
                });
              }
            }, [route]);
            if (id === undefined) {
              return <div>id is undefined</div>;
            }
            return children();
          }}
        />
      </Routes>
    </HashRouter>
  );
};

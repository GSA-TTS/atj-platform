import '@uswds/uswds';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';
import './index.scss';
import { AppContextProvider, Context } from './context';

export const createAppRoot = (rootElement: HTMLElement, context: Context) =>
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppContextProvider context={context}>
        <App />
      </AppContextProvider>
    </React.StrictMode>
  );

import React, { useEffect } from 'react';
import {
  useParams,
  HashRouter,
  Route,
  Routes,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import {
  type FormConfig,
  nullBlueprint,
  createFormSession,
  nullSession,
} from '@atj/forms';
import { FormService } from '@atj/form-service';

import { type ComponentForPattern } from '../Form';

import FormDelete from './FormDelete';
import { FormDocumentImport } from './FormDocumentImport';
import FormEdit from './FormEdit';
import { type EditComponentForPattern } from './FormEdit/types';
import FormList from './FormList';
import { FormManagerLayout } from './FormManagerLayout';
import { NavPage } from './FormManagerLayout/TopNavigation';
import { FormPreview } from './FormPreview';
import * as AppRoutes from './routes';
import { FormManagerProvider } from './store';
import { createTestSession } from 'test-form';

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
          path={AppRoutes.MyForms.path}
          Component={() => {
            return (
              <FormManagerProvider context={context} session={nullSession}>
                <FormManagerLayout>
                  <FormList formService={context.formService} />
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path={AppRoutes.Preview.path}
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const formResult = context.formService.getForm(formId);
            if (!formResult.success) {
              return <div>Error loading form preview</div>;
            }
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                session={createFormSession(formResult.data)}
              >
                <FormManagerLayout>
                  <FormPreview />
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path={AppRoutes.Upload.path}
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const formResult = context.formService.getForm(formId);
            if (!formResult.success) {
              return <div>Form not found</div>;
            }
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                session={createFormSession(formResult.data)}
              >
                <FormManagerLayout
                  step={NavPage.upload}
                  back={AppRoutes.MyForms.getUrl()}
                  next={AppRoutes.Create.getUrl(formId)}
                  preview={AppRoutes.Preview.getUrl(formId)}
                >
                  <FormDocumentImport
                    context={context}
                    baseUrl={context.baseUrl}
                    formId={formId}
                    formService={context.formService}
                  />
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path={AppRoutes.Create.path}
          Component={() => {
            const { formId } = useParams();
            const [searchParams] = useSearchParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const formResult = context.formService.getForm(formId);
            if (!formResult.success) {
              return <div>Form not found</div>;
            }
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                session={createFormSession(
                  formResult.data,
                  searchParams.toString()
                )}
                savePeriodically={true}
              >
                <FormManagerLayout
                  step={NavPage.create}
                  back={AppRoutes.Upload.getUrl(formId)}
                  next={AppRoutes.Configure.getUrl(formId)}
                  preview={AppRoutes.Preview.getUrl(formId)}
                >
                  <FormEdit />
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path={AppRoutes.Configure.path}
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const formResult = context.formService.getForm(formId);
            if (!formResult.success) {
              return 'Form not found';
            }
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                session={createFormSession(formResult.data)}
              >
                <FormManagerLayout
                  step={NavPage.configure}
                  back={AppRoutes.Create.getUrl(formId)}
                  next={AppRoutes.Publish.getUrl(formId)}
                  preview={AppRoutes.Preview.getUrl(formId)}
                >
                  Publish
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path={AppRoutes.Publish.path}
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const result = context.formService.getForm(formId);
            if (!result.success) {
              return 'Form not found';
            }
            const session = createFormSession(result.data);
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                session={session}
              >
                <FormManagerLayout
                  step={NavPage.publish}
                  back={AppRoutes.Configure.getUrl(formId)}
                  close={AppRoutes.MyForms.getUrl()}
                  preview={AppRoutes.Preview.getUrl(formId)}
                >
                  Publish
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path={AppRoutes.Delete.path}
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
      </Routes>
    </HashRouter>
  );
}

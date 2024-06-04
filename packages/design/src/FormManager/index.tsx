import React from 'react';
import {
  useParams,
  HashRouter,
  Route,
  Routes,
  useSearchParams,
} from 'react-router-dom';

import { type FormConfig, createFormSession, nullSession } from '@atj/forms';
import { FormService } from '@atj/form-service';

import { type ComponentForPattern } from '../Form';

import FormDelete from './FormDelete';
import FormEdit from './FormEdit';
import { type EditComponentForPattern } from './FormEdit/types';
import { FormInspect } from './FormInspect';
import FormList from './FormList';
import { FormManagerLayout } from './FormManagerLayout';
import { NavPage } from './FormManagerLayout/TopNavigation';
import { FormPreview } from './FormPreview';
import * as AppRoutes from './routes';
import { FormManagerProvider } from './store';
import AvailableFormList, {
  UrlForForm,
  UrlForFormManager,
} from '../AvailableFormList';

export type FormManagerContext = {
  baseUrl: `${string}/`;
  components: ComponentForPattern;
  config: FormConfig;
  editComponents: EditComponentForPattern;
  formService: FormService;
  uswdsRoot: `${string}/`;
  urlForForm: UrlForForm;
  urlForFormManager: UrlForFormManager;
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
                  <AvailableFormList
                    formService={context.formService}
                    urlForForm={context.urlForForm}
                    urlForFormManager={context.urlForFormManager}
                  />
                </FormManagerLayout>
              </FormManagerProvider>
            );
          }}
        />
        <Route
          path={AppRoutes.GuidedFormCreation.path}
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
          path={AppRoutes.Inspect.path}
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
                  <FormInspect />
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
                  back={AppRoutes.GuidedFormCreation.getUrl()}
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

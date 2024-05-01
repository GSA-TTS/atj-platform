import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { type FormConfig, nullBlueprint } from '@atj/forms';
import { FormService } from '@atj/form-service';

import { type ComponentForPattern } from '../Form';

import FormDelete from './FormDelete';
import { FormDocumentImport } from './FormDocumentImport';
import FormEdit from './FormEdit';
import { type EditComponentForPattern } from './FormEdit/types';
import FormList from './FormList';
import { FormManagerLayout, NavPage } from './FormManagerLayout';
import { FormPreview } from './FormPreview';
import * as AppRoutes from './routes';
import { FormManagerProvider } from './store';

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
          Component={() => (
            <FormManagerProvider
              context={context}
              formId={formId}
              form={nullBlueprint}
            >
              <FormManagerLayout>
                <FormList formService={context.formService} />
              </FormManagerLayout>
            </FormManagerProvider>
          )}
        />
        <Route
          path={AppRoutes.Preview.path}
          Component={() => {
            const { formId } = useParams();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const form = context.formService.getForm(formId);
            if (!form.success) {
              return <div>Error loading form preview</div>;
            }
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                form={form.data}
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
            const result = context.formService.getForm(formId);
            if (!result.success) {
              return <div>Form not found</div>;
            }
            const form = result.data;
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                form={form}
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
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const result = context.formService.getForm(formId);
            if (!result.success) {
              return <div>Form not found</div>;
            }
            const form = result.data;
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                form={form}
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
            const result = context.formService.getForm(formId);
            if (!result.success) {
              return 'Form not found';
            }
            const form = result.data;
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                form={form}
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
            const form = result.data;
            return (
              <FormManagerProvider
                context={context}
                formId={formId}
                form={form}
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

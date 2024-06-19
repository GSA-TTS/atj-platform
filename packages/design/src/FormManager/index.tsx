import React from 'react';
import {
  useParams,
  HashRouter,
  Route,
  Routes,
  useSearchParams,
} from 'react-router-dom';

import { type FormConfig, createFormSession, nullSession } from '@atj/forms';
import { service } from '@atj/forms';

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
import styles from './FormEdit/formEditStyles.module.css';

export type FormManagerContext = {
  baseUrl: `${string}/`;
  components: ComponentForPattern;
  config: FormConfig;
  editComponents: EditComponentForPattern;
  formService: service.FormService;
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
                <FormManagerLayout
                  step={NavPage.preview}
                  preview={AppRoutes.Preview.getUrl(formId)}
                  back={AppRoutes.Create.getUrl(formId)}
                >
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
                  <div className={`${styles.progressPage} grid-container`}>
                    <div className="grid-row">
                      <div className="grid-col-12">
                        <h1 className="font-body-3xl text-center bg-primary-darker padding-3 text-base-lightest">
                          <span>Coming Soon..</span>
                          <svg
                            className="usa-icon"
                            aria-hidden="true"
                            focusable="false"
                            role="img"
                          >
                            <use
                              xlinkHref={`${context.uswdsRoot}img/sprite.svg#construction_worker`}
                            ></use>
                          </svg>
                        </h1>
                        <h2 className="font-ui-xl">
                          Form Approval and Settings
                        </h2>
                        <h3 className="font-ui-lg">
                          <svg
                            className="usa-icon display-inline-block text-ttop margin-right-1 text-accent-warm"
                            aria-hidden="true"
                            focusable="false"
                            role="img"
                          >
                            <use
                              xlinkHref={`${context.uswdsRoot}img/sprite.svg#warning`}
                            ></use>
                          </svg>
                          <span className="display-inline-block text-ttop">
                            Work in Progress - Hello, DOJ Pardon Office!
                          </span>
                          <svg
                            className="usa-icon display-inline-block text-ttop margin-left-1 text-accent-warm"
                            aria-hidden="true"
                            focusable="false"
                            role="img"
                          >
                            <use
                              xlinkHref={`${context.uswdsRoot}img/sprite.svg#warning`}
                            ></use>
                          </svg>
                        </h3>
                        <p className="font-ui-md">
                          On this page, you can add additional settings to your
                          form, gather and review feedback by colleagues and
                          share the form for supervisor review.
                        </p>
                        <p className="font-ui-md">
                          Unprioritized Upcoming Feature List:
                        </p>
                        <ul className="usa-list font-ui-md">
                          <li>Commenting tools for colleagues</li>
                          <li>Commenting and review tools for supervisors</li>
                          <li>
                            Tracking form edit changes by multiple form builders
                          </li>
                          <li>Form branding tools</li>
                          <li>
                            Guided process to include additional forms in the
                            form application
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
                  <div className={`${styles.progressPage} grid-container`}>
                    <div className="grid-row">
                      <div className="grid-col-12">
                        <h1 className="font-body-3xl text-center bg-primary-darker padding-3 text-base-lightest">
                          <span>Coming Soon..</span>
                          <svg
                            className="usa-icon"
                            aria-hidden="true"
                            focusable="false"
                            role="img"
                          >
                            <use
                              xlinkHref={`${context.uswdsRoot}img/sprite.svg#construction_worker`}
                            ></use>
                          </svg>
                        </h1>
                        <h2 className="font-ui-xl">Publish</h2>
                        <p className="font-ui-md">
                          On this page, you can review the pdf preview of your
                          created form and publish it. The exact contents of
                          this page are subject to change following additional
                          user research.
                        </p>
                        <p className="font-ui-md">
                          Unprioritized Upcoming Feature List:
                        </p>
                        <ul className="usa-list font-ui-md">
                          <li>A scrollable pdf view</li>
                          <li>A publish option for the page</li>
                        </ul>
                        <p>
                          <a
                            href={AppRoutes.Preview.getUrl(formId)}
                            className="usa-button usa-button--big margin-top-3"
                          >
                            Publish
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
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

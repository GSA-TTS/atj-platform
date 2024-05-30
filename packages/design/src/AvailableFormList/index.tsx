import React, { useEffect, useState } from 'react';
import { FormService } from '@atj/form-service';
import * as AppRoutes from '../FormManager/routes';

type FormDetails = {
  id: string;
  title: string;
  description: string;
};
type UrlForForm = (id: string) => string;
type UrlForFormManager = UrlForForm;

export default function AvailableFormList({
  formService,
  urlForForm,
  urlForFormManager,
}: {
  formService: FormService;
  urlForForm: UrlForForm;
  urlForFormManager: UrlForFormManager;
}) {
  const [forms, setForms] = useState<FormDetails[]>([]);
  useEffect(() => {
    const result = formService.getFormList();
    if (result.success) {
      setForms(result.data);
    }
  }, []);
  return (
    <>
      <FormList
        forms={forms}
        urlForForm={urlForForm}
        urlForFormManager={urlForFormManager}
      />
      <p>
        <a href={AppRoutes.GuidedFormCreation.getUrl()} className="usa-button">
          Create New
        </a>
      </p>
    </>
  );
}

const FormList = ({
  forms,
  urlForForm,
  urlForFormManager,
}: {
  forms: FormDetails[];
  urlForForm: UrlForForm;
  urlForFormManager: UrlForFormManager;
}) => {
  return (
    <table className="usa-table usa-table--stacked">
      <thead>
        <tr>
          <th className="column1" scope="col">
            Form title
          </th>
          <th className="column2" scope="col">
            Description
          </th>
          <th className="column3" scope="col">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {!forms.length ? (
          <tr>
            <th data-label="Form title" scope="row">
              There are no forms here yet
            </th>
            <td data-label="Description">{''}</td>
            <td data-label="Actions">{''}</td>
          </tr>
        ) : (
          forms.map((form, index) => (
            <tr key={index}>
              <th data-label="Form title" scope="row">
                {form.title}
              </th>
              <td data-label="Description">{form.description}</td>
              <td data-label="Actions">
                <div className="grid-row grid-gap-md">
                  <a
                    href={urlForForm(form.id)}
                    title={form.title}
                    className="grid-col-auto"
                  >
                    Go to form
                  </a>
                  <a
                    href={`${urlForFormManager(form.id)}/create`}
                    className="grid-col-auto"
                  >
                    Edit
                  </a>
                  <a
                    href={`${urlForFormManager(form.id)}/delete`}
                    className="grid-col-auto"
                  >
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

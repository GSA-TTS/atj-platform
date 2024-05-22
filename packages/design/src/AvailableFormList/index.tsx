import React, { useEffect, useState } from 'react';

import { FormService } from '@atj/form-service';

type FormDetails = {
  id: string;
  title: string;
  description: string;
};
type UrlForForm = (id: string) => string;

export default function AvailableFormList({
  formService,
  urlForForm,
}: {
  formService: FormService;
  urlForForm: UrlForForm;
}) {
  const [forms, setForms] = useState<FormDetails[]>([]);
  useEffect(() => {
    const result = formService.getFormList();
    if (result.success) {
      setForms(result.data);
    }
  }, []);
  return <FormList forms={forms} urlForForm={urlForForm} />;
}

const FormList = ({
  forms,
  urlForForm,
}: {
  forms: FormDetails[];
  urlForForm: UrlForForm;
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
                <div className="grid-container">
                  <div className="grid-row grid-gap-md">
                    <a
                      href={urlForForm(form.id)}
                      title={form.title}
                      className="grid-col-auto"
                    >
                      Go to form
                    </a>
                    <a
                      href={`/manage/#/${form.id}/create`}
                      className="grid-col-auto"
                    >
                      Edit
                    </a>
                    <a
                      href={`/manage/#/${form.id}/delete`}
                      className="grid-col-auto"
                    >
                      Delete
                    </a>
                  </div>
                </div>
                {/*<span>*/}
                {/*  <Link to={`/${form.id}/create`}>Edit</Link>*/}
                {/*</span>*/}
                {/*<span>*/}
                {/*  <Link to={`/${form.id}/delete`}>Delete</Link>*/}
                {/*</span>*/}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

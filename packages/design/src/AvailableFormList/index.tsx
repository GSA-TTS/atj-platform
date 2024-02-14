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
      <caption>Available forms</caption>
      <thead>
        <tr>
          <th className="column1" scope="col">Form title</th>
          <th className="column2" scope="col">Description</th>
          <th className="column3" scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {forms.map((form, index) => (
          <tr key={index}>
            <th data-label="Form title" scope="row">{form.title}</th>
            <td data-label="Description">{form.description}</td>
            <td data-label="Actions">
              <a href={`/manage/#/${form.id}`} title={form.title}>
                Preview form
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};

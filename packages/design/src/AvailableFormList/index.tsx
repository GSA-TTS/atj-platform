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
    <table className="usa-table">
      <caption>Available forms</caption>
      <thead>
        <tr>
          <th scope="col">Form title</th>
          <th scope="col">Description</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {forms.map((form, index) => (
          <tr key={index}>
            <th scope="row">{form.title}</th>
            <td>{form.description}</td>
            <td>
              <a href={urlForForm(form.id)} title={form.title}>
                Go to form
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

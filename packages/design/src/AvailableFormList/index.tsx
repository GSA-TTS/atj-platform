import React from 'react';

export default function AvailableFormList({
  forms,
}: {
  forms: { title: string; description: string; url: string }[];
}) {
  return (
    <table className="usa-table">
      <caption>Bordered table</caption>
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
              <a href={form.url} title={form.title}>
                Go to form
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

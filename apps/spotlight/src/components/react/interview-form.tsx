import React from 'react';

const form = {
  action: 'https://yaawr84uu7.execute-api.us-east-2.amazonaws.com',
  fields: [
    {
      type: 'text',
      name: 'full_name',
      label: 'Full Name',
      required: true,
    },
  ],
};

export default () => (
  <form action={form.action} method="post" className="usa-form usa-form--large">
    <fieldset className="usa-fieldset">
      <legend className="usa-legend usa-legend--large"> Sample form</legend>
      <p>
        Required fields are marked with an asterisk (
        <abbr title="required" className="usa-hint usa-hint--required">
          *
        </abbr>
        ).
      </p>
      <label className="usa-label" htmlFor="full_name">
        {form.fields[0].label}
        {form.fields[0].required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            *
          </abbr>
        )}
        <input
          className="usa-input"
          id={form.fields[0].name}
          name={form.fields[0].name}
          type={form.fields[0].type}
        />
      </label>
      <input className="usa-button" type="submit" value="Submit" />
    </fieldset>
  </form>
);

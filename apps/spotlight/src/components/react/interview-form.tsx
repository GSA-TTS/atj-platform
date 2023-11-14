import React from 'react';

import { type Interview, createInterviewContext } from '@atj/interviews';
import { Field } from '@atj/interviews/src/prompt';
import { BooleanFact, TextFact } from '@atj/interviews/src/fact';

const form = {
  action: 'https://yaawr84uu7.execute-api.us-east-2.amazonaws.com',
};

export const InterviewForm = (props: { interview: Interview }) => {
  const context = createInterviewContext(props.interview);
  return (
    <form
      action={form.action}
      method="post"
      className="usa-form usa-form--large"
    >
      <fieldset className="usa-fieldset">
        <legend className="usa-legend usa-legend--large"> Sample form</legend>
        <p>
          Required fields are marked with an asterisk (
          <abbr title="required" className="usa-hint usa-hint--required">
            *
          </abbr>
          ).
        </p>
        {context.prompt.fields.map(field => {
          const question = props.interview.questions[field.id];
          if (question.fact.type === 'boolean') {
            return (
              <BooleanPrompt
                key={field.id}
                field={field as Field<BooleanFact>}
                //onBlur={opts.handleBlur}
                //onChange={opts.handleChange}
              />
            );
          } else if (question.fact.type === 'text') {
            return (
              <TextPrompt
                key={field.id}
                field={field as Field<TextFact>}
                //onBlur={opts.handleBlur}
                //onChange={opts.handleChange}
              />
            );
          } else {
            const _exhaustiveCheck: never = question.fact;
            return <></>;
          }
        })}
        <input className="usa-button" type="submit" value="Submit" />
      </fieldset>
    </form>
  );
};

const TextPrompt = ({
  field,
}: {
  field: Field<TextFact>;
  //onBlur: FocusEventHandler;
  //onChange: ChangeEventHandler;
}) => {
  return (
    <label className="usa-label" htmlFor="full_name">
      {field.title}
      {field.required && (
        <abbr title="required" className="usa-hint usa-hint--required">
          *
        </abbr>
      )}
      <input
        className="usa-input"
        name={field.name}
        type="text"
        onChange={val => {
          console.log(val);
          //return onChange(val);
        }}
        //onBlur={onBlur}
        defaultValue={field.value}
      />
    </label>
  );
};

const BooleanPrompt = ({
  field,
}: {
  field: Field<BooleanFact>;
  //onBlur: FocusEventHandler;
  //onChange: ChangeEventHandler;
}) => (
  <div>
    <label className="usa-label usa-checkbox__label" htmlFor="full_name">
      {field.title}
      {field.required && (
        <abbr title="required" className="usa-hint usa-hint--required">
          *
        </abbr>
      )}
    </label>
    <input
      className="usa-checkbox__input"
      name={field.name}
      type="checkbox"
      defaultChecked={!!field.value}
      onChange={val => {
        console.log(val);
        //return onChange(val);
      }}
      //onBlur={onBlur}
    />
  </div>
);

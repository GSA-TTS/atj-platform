import { Formik } from 'formik';
import React, { ChangeEventHandler, FocusEventHandler } from 'react';

import { mapValues } from '../../lib/util';
import { type Interview, createInterviewContext } from '@atj/interviews';
import { type Question } from '@atj/interviews/src/question';

const form = {
  action: 'https://yaawr84uu7.execute-api.us-east-2.amazonaws.com',
};

export const InterviewForm = (props: { interview: Interview }) => {
  const interviewContext = createInterviewContext(props.interview);
  return (
    <Formik
      initialValues={mapValues(
        props.interview.questions,
        question => question.fact.initial
      )}
      onSubmit={values => {
        console.log('Submitting form', values);
      }}
    >
      {opts => (
        <form
          action={form.action}
          method="post"
          className="usa-form usa-form--large"
        >
          <fieldset className="usa-fieldset">
            <legend className="usa-legend usa-legend--large">
              {' '}
              Sample form
            </legend>
            <p>
              Required fields are marked with an asterisk (
              <abbr title="required" className="usa-hint usa-hint--required">
                *
              </abbr>
              ).
            </p>
            {Object.entries(opts.values).map(([name, value]) => {
              const question = props.interview.questions[name];
              if (question.fact.type === 'boolean') {
                return (
                  <BooleanPrompt
                    key={name}
                    name={name}
                    question={question}
                    value={value as boolean}
                    onBlur={opts.handleBlur}
                    onChange={opts.handleChange}
                  />
                );
              } else if (question.fact.type === 'text') {
                return (
                  <TextPrompt
                    key={name}
                    name={name}
                    question={question}
                    value={value as string}
                    onBlur={opts.handleBlur}
                    onChange={opts.handleChange}
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
      )}
    </Formik>
  );
};

const TextPrompt = ({
  question,
  name,
  value,
  onBlur,
  onChange,
}: {
  question: Question;
  name: string;
  value?: string;
  onBlur: FocusEventHandler;
  onChange: ChangeEventHandler;
}) => {
  return (
    <label className="usa-label" htmlFor="full_name">
      {question.prompt.title}
      {question.prompt.required && (
        <abbr title="required" className="usa-hint usa-hint--required">
          *
        </abbr>
      )}
      <input
        className="usa-input"
        name={name}
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={value}
      />
    </label>
  );
};

const BooleanPrompt = ({
  question,
  name,
  value,
  onBlur,
  onChange,
}: {
  question: Question;
  name: string;
  value?: boolean;
  onBlur: FocusEventHandler;
  onChange: ChangeEventHandler;
}) => (
  <div>
    <label className="usa-label usa-checkbox__label" htmlFor="full_name">
      {question.prompt.title}
      {question.prompt.required && (
        <abbr title="required" className="usa-hint usa-hint--required">
          *
        </abbr>
      )}
    </label>
    <input
      className="usa-checkbox__input"
      name={name}
      type="checkbox"
      defaultChecked={value}
      onChange={val => {
        console.log(val);
        return onChange(val);
      }}
      onBlur={onBlur}
    />
  </div>
);

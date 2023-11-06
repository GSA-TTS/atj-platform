import { Formik } from 'formik';
import React, { ChangeEventHandler, FocusEventHandler } from 'react';

import { mapValues } from '../../lib/util';
import { type Interview, sampleInterview } from '@atj/interviews';
import { type Question } from '@atj/interviews/src/question';

const form = {
  action: 'https://yaawr84uu7.execute-api.us-east-2.amazonaws.com',
};

const questionById = (interview: Interview, id: string) => {
  const filtered = Object.values(interview.questions).filter(q => q.id === id);
  if (filtered.length !== 1) {
    throw new Error(`questions '${id} not found in interview`);
  }
  return filtered[0];
};

export const InterviewForm = () => {
  return (
    <Formik
      initialValues={mapValues(
        sampleInterview.questions,
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
              const question = questionById(sampleInterview, name);
              if (question.fact.type === 'boolean') {
                return (
                  <BooleanPrompt
                    key={name}
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
  value,
  onBlur,
  onChange,
}: {
  question: Question;
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
        name={question.id}
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
  value,
  onBlur,
  onChange,
}: {
  question: Question;
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
      name={question.id}
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

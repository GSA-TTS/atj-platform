import React, { useReducer } from 'react';

import {
  type BooleanFact,
  type Field,
  type Interview,
  type TextFact,
  createInterviewContext,
  nextContext,
} from '@atj/interviews';

/*
const form = {
  action: 'https://yaawr84uu7.execute-api.us-east-2.amazonaws.com',
};
*/

const useInterviewContext = (interview: Interview) => {
  const context = createInterviewContext(interview);
  const reducer = (state: typeof context, action) => nextContext(state, action);
  return useReducer(reducer, context);
};

export const InterviewForm = (props: { interview: Interview }) => {
  const [context, dispatch] = useInterviewContext(props.interview);
  return (
    <form
      //action={form.action}
      //method="post"
      onSubmit={event => {
        event.preventDefault();
        const formData = new FormData(
          event.currentTarget
          //(event.nativeEvent as any).submitter
        );
        dispatch({ type: 'submit', formData });
      }}
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
          const element = context.interview.elements[field.id];
          if (element.fact.type === 'boolean') {
            return (
              <BooleanPrompt
                key={field.id}
                field={field as Field<BooleanFact>}
              />
            );
          } else if (element.fact.type === 'text') {
            return (
              <TextPrompt key={field.id} field={field as Field<TextFact>} />
            );
          } else {
            const _exhaustiveCheck: never = element.fact; // eslint-disable-line @typescript-eslint/no-unused-vars
            return <></>;
          }
        })}
        {context.prompt.buttons.map((button, index) => (
          <input
            key={index}
            className="usa-button"
            type="submit"
            id={button.name}
            name={button.name}
            value={button.text}
            disabled={button.disabled}
          />
        ))}
      </fieldset>
    </form>
  );
};

const TextPrompt = ({ field }: { field: Field<TextFact> }) => {
  return (
    <label className="usa-label" htmlFor={field.name}>
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
        defaultValue={field.value}
      />
    </label>
  );
};

const BooleanPrompt = ({ field }: { field: Field<BooleanFact> }) => {
  return (
    <div>
      <label className="usa-label usa-checkbox__label" htmlFor={field.name}>
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
        checked={false}
        //defaultChecked={!!field.value}
      />
    </div>
  );
};

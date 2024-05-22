import classnames from 'classnames';
import React from 'react';

import { PageProps } from '@atj/forms';
import { en as message } from '@atj/common/src/locales/en/app';
import { PagePattern } from '@atj/forms/src/patterns/page/config';

import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';
import { PatternPreviewSequence } from './PreviewSequencePattern';

export const PageEdit: PatternEditComponent<PageProps> = props => {
  return (
    <>
      {props.focus ? (
        <PatternEditForm
          pattern={props.focus.pattern}
          editComponent={<PageEditComopnent pattern={props.focus.pattern} />}
        ></PatternEditForm>
      ) : (
        <div className="display-flex flex-justify border-bottom border-base border-dotted border-top-width-0 border-left-width-0 border-right-width-0">
          <div className="text-uppercase text-ls-1 text-base">
            {props.previewProps.title || 'untitled page'}
          </div>
          <div className="text-base">Page 1</div>
        </div>
      )}
      <PatternPreviewSequence
        context={props.context}
        previewProps={{
          type: 'sequence',
          _patternId: props.previewProps._patternId,
          children: props.previewProps.children,
        }}
      />
    </>
  );
};

const PageEditComopnent = ({ pattern }: { pattern: PagePattern }) => {
  const { fieldId, getFieldState, register } =
    usePatternEditFormContext<PagePattern>(pattern.id);
  const title = getFieldState('title');

  return (
    <div className="grid-row grid-gap">
      <input
        type="hidden"
        {...register('patterns')}
        defaultValue={pattern.data.patterns}
      ></input>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': title.error,
          })}
          htmlFor={fieldId('title')}
        >
          {message.patterns.page.fieldLabel}
        </label>
        {title.error ? (
          <span className="usa-error-message" role="alert">
            {title.error.message}
          </span>
        ) : null}
        <input
          className="usa-input"
          id={fieldId('title')}
          defaultValue={pattern.data.title}
          {...register('title')}
          type="text"
        ></input>
      </div>
      <div className="grid-col-12">
        <PatternEditActions />
      </div>
    </div>
  );
};

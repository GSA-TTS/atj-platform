import classnames from 'classnames';
import React, { useState } from 'react';

import { PageProps } from '@atj/forms';
import { enLocale as message } from '@atj/common';
import { PagePattern } from '@atj/forms';

import { useRouteParams } from '../../hooks.js';
import { PatternEditComponent } from '../types.js';

import { PatternEditActions } from './common/PatternEditActions.js';
import { PatternEditForm } from './common/PatternEditForm.js';
import { usePatternEditFormContext } from './common/hooks.js';
import { PatternPreviewSequence } from './PreviewSequencePattern/index.js';
import styles from '../formEditStyles.module.css';
import type { FormManagerContext } from 'FormManager/index.js';

export const PageEdit: PatternEditComponent<PageProps> = props => {
  const handleParentClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      // Trigger focus or any other action you want when the parent div is clicked
      event.currentTarget.focus();
    }
  };

  const [editingRule, setEditingRule] = useState<
    PageProps['rules'][number] | null
  >(null);
  const { routeParams } = useRouteParams();
  const params = new URLSearchParams(routeParams?.toString());
  const pageNumberText = Number(params.get('page')) + 1;

  return (
    <>
      {props.focus ? (
        <PatternEditForm
          pattern={props.focus.pattern}
          editComponent={<PageEditComponent pattern={props.focus.pattern} />}
        ></PatternEditForm>
      ) : (
        <div
          className={`${styles.titleArea} display-flex flex-justify flex-align-center position-relative margin-bottom-205`}
          onClick={handleParentClick}
          tabIndex={0} // Make the div focusable
        >
          <span
            className={`${styles.titleText} padding-right-1 text-uppercase text-ls-1 text-base-darkest bg-primary-lighter`}
          >
            {props.previewProps.title || 'untitled page'}{' '}
            <span className="text-secondary-darker">*</span>
          </span>
          <span
            className={`${styles.pageNumber} padding-left-1 text-base-darkest bg-primary-lighter`}
          >
            Page {pageNumberText}
          </span>
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

      <div data-pattern-edit-control="true">
        <div className="margin-y-2">
          <strong>NAVIGATION:</strong> After the current page is completed, go
          to the next page unless a custom rule applies.
        </div>
        {props.previewProps.rules.map((rule, index) => (
          <div
            key={index}
            className="display-flex flex-justify flex-align-center margin-y-1"
          >
            <div className="display-flex flex-align-center">
              <svg
                className="usa-icon usa-icon--size-3 margin-right-1"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <use
                  xlinkHref={`${props.context.uswdsRoot}img/sprite.svg#directions`}
                ></use>
              </svg>
              <div>
                If{' '}
                <button
                  className="usa-button usa-button--unstyled"
                  onClick={() => setEditingRule(rule)}
                >
                  these questions
                </button>{' '}
                are selected, go to{' '}
                <span className="text-bold">{rule.next}</span>.
              </div>
            </div>
            <div className="display-flex flex-align-center">
              <RuleButton
                context={props.context}
                icon="edit"
                label="Edit rule"
              />
              <RuleButton
                context={props.context}
                icon="content_copy"
                label="Copy rule"
              />
              <RuleButton
                context={props.context}
                icon="delete"
                label="Delete rule"
              />
              <RuleButton
                context={props.context}
                icon="drag_handle"
                label="Reorder rule"
              />
            </div>
          </div>
        ))}
        <hr className="border-base-lighter margin-top-2" />
        <div className="margin-top-2">
          <button
            type="button"
            className="usa-button usa-button--unstyled display-flex flex-align-center"
          >
            <svg
              className="usa-icon usa-icon--size-3 margin-right-1"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use
                xlinkHref={`${props.context.uswdsRoot}img/sprite.svg#add_circle`}
              ></use>
            </svg>
            Create custom rule
          </button>
        </div>
      </div>
    </>
  );
};

const PageEditComponent = ({ pattern }: { pattern: PagePattern }) => {
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
          type="text"
          id={fieldId('title')}
          defaultValue={pattern.data.title}
          {...register('title')}
          autoFocus
        ></input>
      </div>
      <div className="grid-col-12">
        <PatternEditActions />
      </div>
    </div>
  );
};

const RuleButton = (props: {
  context: FormManagerContext;
  icon: string;
  label: string;
}) => (
  <button className="usa-button usa-button--unstyled">
    <svg
      className="usa-icon usa-icon--size-3 margin-right-1"
      aria-label={props.label}
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <use
        xlinkHref={`${props.context.uswdsRoot}img/sprite.svg#${props.icon}`}
      ></use>
    </svg>
  </button>
);

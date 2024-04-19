import React, { PropsWithChildren, ReactElement } from 'react';
import { useFormEditStore } from './store';
import classNames from 'classnames';

type PatternEditActionsProps = PropsWithChildren<{
  children?: ReactElement;
}>;

export const PatternEditActions = ({ children }: PatternEditActionsProps) => {
  children;
  const context = useFormEditStore(state => state.context);
  const { deleteSelectedPattern } = useFormEditStore(state => ({
    deleteSelectedPattern: state.deleteSelectedPattern,
  }));

  return (
    <>
      <div className="border-top-1px border-base-lighter padding-top-1 margin-top-1">
        <span
          className={classNames('display-inline', {
            'border-base-lighter': children,
            'padding-right-1': children,
            'margin-right-1': children,
          })}
        >
          <button
            type="button"
            aria-label="Delete this pattern"
            title="Delete this pattern"
            className="usa-button--outline usa-button--unstyled"
            onClick={event => {
              event.preventDefault();
              deleteSelectedPattern();
            }}
          >
            <svg
              className="usa-icon usa-icon--size-3 margin-1"
              style={{ verticalAlign: 'middle' }}
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use
                xlinkHref={`${context.uswdsRoot}img/sprite.svg#delete`}
              ></use>
            </svg>
          </button>
          <button
            type="button"
            aria-label="Create a copy of this pattern"
            title="Create a copy of this pattern"
            className="usa-button--outline usa-button--unstyled"
            onClick={event => {
              event.preventDefault();
              alert('Unimplemented');
            }}
          >
            <svg
              className="usa-icon usa-icon--size-3 margin-1"
              style={{ verticalAlign: 'middle' }}
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use
                xlinkHref={`${context.uswdsRoot}img/sprite.svg#content_copy`}
              ></use>
            </svg>
          </button>
          {children ? (
            <span className="margin-left-1 padding-left-2 border-left-1px border-base-lighter">
              {children}
            </span>
          ) : null}
        </span>
      </div>
    </>
  );
};
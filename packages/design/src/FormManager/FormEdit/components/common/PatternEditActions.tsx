import React, { PropsWithChildren, ReactElement } from 'react';
import classNames from 'classnames';

import { useFormManagerStore } from '../../../store';

type PatternEditActionsProps = PropsWithChildren<{
  children?: ReactElement;
}>;

export const PatternEditActions = ({ children }: PatternEditActionsProps) => {
  children;
  const context = useFormManagerStore(state => state.context);
  const { deleteSelectedPattern } = useFormManagerStore(state => ({
    deleteSelectedPattern: state.deleteSelectedPattern,
  }));
  const { copyPattern } = useFormManagerStore(state => ({
    copyPattern: state.copyPattern,
  }));
  const focusPatternId = useFormManagerStore(state => state.focus?.pattern.id);
  const pages = useFormManagerStore(state =>
    Object.values(state.session.form.patterns).filter(p => p.type === 'page')
  );
  const fieldsets = useFormManagerStore(state =>
    Object.values(state.session.form.patterns).filter(
      p => p.type === 'fieldset'
    )
  );

  const handleCopyPattern = () => {
    const currentPageIndex = pages.findIndex(page =>
      page.data.patterns.includes(focusPatternId || '')
    );
    const currentFieldsetIndex = fieldsets.findIndex(fieldset =>
      fieldset.data.patterns.includes(focusPatternId)
    );
    const sourcePagePatternId = pages[currentPageIndex]?.id;
    const sourceFieldsetPatternId = fieldsets[currentFieldsetIndex]?.id;

    if (focusPatternId) {
      if (sourcePagePatternId) {
        copyPattern(sourcePagePatternId, focusPatternId);
      } else {
        copyPattern(sourceFieldsetPatternId, focusPatternId);
      }
    }
  };

  return (
    <>
      <div className="border-top-1px border-base-lighter margin-top-2 margin-bottom-2 padding-top-1 width-full text-right pattern-edit-panel base-dark">
        <span
          className={classNames('display-inline-block', {
            'border-base-lighter': children,
            'padding-right-1': children,
            'margin-right-1': children,
          })}
        >
          <button
            type="button"
            aria-label="Create a copy of this pattern"
            title="Create a copy of this pattern"
            className="usa-button--outline usa-button--unstyled"
            onClick={event => {
              event.preventDefault();
              handleCopyPattern();
            }}
          >
            <svg
              className="usa-icon usa-icon--size-3 margin-1 text-middle"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use
                xlinkHref={`${context.uswdsRoot}img/sprite.svg#content_copy`}
              ></use>
            </svg>
          </button>

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
              className="usa-icon usa-icon--size-3 margin-1 text-middle"
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
            type="submit"
            aria-label="Save changes to this pattern"
            title="Save changes to this pattern"
            className="usa-button--outline usa-button--unstyled text-success hover:text-success"
          >
            <svg
              className="usa-icon usa-icon--size-3 margin-1 text-middle"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use xlinkHref={`${context.uswdsRoot}img/sprite.svg#check`}></use>
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

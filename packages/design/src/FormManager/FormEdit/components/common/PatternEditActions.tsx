import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import classNames from 'classnames';

import { useFormManagerStore } from '../../../store';
import MovePatternDropdown from './MovePatternDropdown';
import styles from '../../formEditStyles.module.css';

type PatternEditActionsProps = PropsWithChildren<{
  children?: ReactElement;
}>;

export const PatternEditActions = ({ children }: PatternEditActionsProps) => {
  children;
  const context = useFormManagerStore(state => state.context);
  const { deleteSelectedPattern } = useFormManagerStore(state => ({
    deleteSelectedPattern: state.deleteSelectedPattern,
  }));
  const focusPatternType = useFormManagerStore(state => state.focus?.pattern.type);
  const patterns = useFormManagerStore(state =>
    Object.values(state.session.form.patterns)
  );
  const focusPatternId = useFormManagerStore(state => state.focus?.pattern.id);
  const isPatternInFieldset = useMemo(() => {
    if (!focusPatternId) return false;
    return patterns.some(
      p => p.type === 'fieldset' && p.data.patterns.includes(focusPatternId)
    );
  }, [focusPatternId, patterns]);
  const isFieldset = focusPatternType === 'fieldset';

  return (
    <>
      <div
        className={`${styles.patternActionWrapper} margin-top-2 margin-bottom-1 padding-top-1 width-full pattern-edit-panel base-dark text-right`}
      >
        <div
          className={classNames(
            'border-top-1px border-bottom-1px border-base-lighter ',
            {
              'border-base-lighter': children,
              'padding-right-1': children,
              'margin-right-1': children,
            })}
        >
          {!isPatternInFieldset && <MovePatternDropdown isFieldset={isFieldset} />}
          <span
            className={`${styles.patternActionButtons} margin-top-1 margin-bottom-1 display-inline-block text-ttop`}
          >
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
                const confirmed = window.confirm(
                  'Are you sure you want to delete this question?'
                );
                if (confirmed) {
                  deleteSelectedPattern();
                }
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
            {children ? (
              <span className="padding-left-1 padding-top-2px">
                {children}
              </span>
            ) : null}
          </span>
        </div>
        <div className="padding-top-2">
          <button
            type="submit"
            aria-label="Save and Close"
            title="Save and Close"
            className="usa-button"
          >
            Save and Close
          </button>
        </div>
      </div>
    </>
  );
};
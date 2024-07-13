import React, { PropsWithChildren, ReactElement, useState } from 'react';
import classNames from 'classnames';

import { useFormManagerStore } from '../../../store';
import styles from '../../formEditStyles.module.css';

type PatternEditActionsProps = PropsWithChildren<{
  children?: ReactElement;
}>;

export const PatternEditActions = ({ 
  children,
}: PatternEditActionsProps) => {
  children;
  const context = useFormManagerStore(state => state.context);
  const { deleteSelectedPattern } = useFormManagerStore(state => ({
    deleteSelectedPattern: state.deleteSelectedPattern,
  }));
  const [targetPage, setTargetPage] = useState('');
  const pages = useFormManagerStore(state =>
    Object.values(state.session.form.patterns).filter(p => p.type === 'page')
  );
  const movePatternToPage = useFormManagerStore(state => state.movePattern);
  const focusPatternId = useFormManagerStore(state => state.focus?.pattern.id);
  const sourcePage = pages[1]?.id;

  // Find the index of the current page
  const currentPageIndex = 1;

  // Exclude the current page from the move options
  const availablePages = pages.slice(1).filter((_, index) => index !== currentPageIndex - 1);

  const handleMovePattern = () => {
    if (focusPatternId && targetPage) {
      movePatternToPage(sourcePage, targetPage, focusPatternId);
    }
  };
  
  console.log('focusPatternId: ', focusPatternId);
  console.log('sourcePage: ', sourcePage);
  console.log('targetPage: ', targetPage);
  console.log('pages: ', pages);
  console.log('currentPageIndex: ', currentPageIndex);
  return (
    <>
      <div className="border-top-1px border-base-lighter margin-top-2 margin-bottom-2 padding-top-1 width-full text-right pattern-edit-panel base-dark">
        <span
          className={classNames({
            'border-base-lighter': children,
            'padding-right-1': children,
            'margin-right-1': children,
          })}
        >
          <span className={`${styles.moveToPage} margin-right-2`}>
            <label className="usa-label display-inline-block margin-right-1" htmlFor="pagenumbers">Move question to page</label>
            <select className="usa-select display-inline-block" name="pagenumbers" id="pagenumbers" value={targetPage} onChange={e => setTargetPage(e.target.value)}>
              <option value="" disabled>Select page</option>
              {availablePages.map((page, index) => (
                <option key={page.id} value={page.id}>
                  {page.data.title || `Page ${index + 2}`}
                </option>
              ))}
            </select>
          </span>
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
            onClick={handleMovePattern}
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

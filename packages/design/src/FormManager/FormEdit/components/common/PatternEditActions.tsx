import React, {
  PropsWithChildren,
  ReactElement,
  useMemo,
  useEffect,
  useState,
  useRef,
} from 'react';
import classNames from 'classnames';

import { useFormManagerStore } from '../../../store';
import styles from '../../formEditStyles.module.css';

type PatternEditActionsProps = PropsWithChildren<{
  children?: ReactElement;
  handleCancel?: () => void;
}>;

// Define the extended type for pages
interface PageWithLabel {
  id: string;
  type: string;
  data: {
    title: string;
    patterns: string[];
  };
  specialLabel?: string;
}

export const PatternEditActions = ({ children }: PatternEditActionsProps) => {
  children;
  const context = useFormManagerStore(state => state.context);
  const { deleteSelectedPattern } = useFormManagerStore(state => ({
    deleteSelectedPattern: state.deleteSelectedPattern,
  }));
  const [targetPage, setTargetPage] = useState('');
  const [moveToPosition, setMoveToPosition] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pages = useFormManagerStore(state =>
    Object.values(state.session.form.patterns).filter(p => p.type === 'page')
  );
  const patterns = useFormManagerStore(state =>
    Object.values(state.session.form.patterns)
  );
  const movePatternToPage = useFormManagerStore(state => state.movePattern);
  const focusPatternId = useFormManagerStore(state => state.focus?.pattern.id);
  const focusPatternType = useFormManagerStore(
    state => state.focus?.pattern.type
  );

  const isPatternInFieldset = useMemo(() => {
    if (!focusPatternId) return false;
    return patterns.some(
      p => p.type === 'fieldset' && p.data.patterns.includes(focusPatternId)
    );
  }, [focusPatternId, patterns]);

  const isFieldset = focusPatternType === 'fieldset';

  const useAvailablePages = (focusPatternId: string | undefined) => {
    const pages = useFormManagerStore(state =>
      Object.values(state.session.form.patterns).filter(p => p.type === 'page')
    );

    const currentPageIndex = pages.findIndex(page =>
      page.data.patterns.includes(focusPatternId || '')
    );

    const page1Count = pages.reduce(
      (count, page) => count + (page.data.title === 'Page 1' ? 1 : 0),
      0
    );

    const availablePages: PageWithLabel[] =
      page1Count > 1
        ? pages.slice(1).map((page, index) => {
            if (index + 1 === currentPageIndex) {
              return { ...page, specialLabel: 'Current page' };
            }
            return page;
          })
        : pages.map((page, index) => {
            if (index === currentPageIndex) {
              return { ...page, specialLabel: 'Current page' };
            }
            return page;
          });

    return availablePages;
  };

  const availablePages = useAvailablePages(focusPatternId);

  const currentPageIndex = pages.findIndex(page =>
    page.data.patterns.includes(focusPatternId || '')
  );

  const sourcePage = pages[currentPageIndex]?.id;

  const handleMovePattern = () => {
    if (focusPatternId && targetPage) {
      const isPageMove = focusPatternType === 'page';
      movePatternToPage(
        sourcePage,
        targetPage,
        focusPatternId,
        moveToPosition,
        isPageMove
      );
    }
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setDropdownOpen(false);
      buttonRef.current?.focus();
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      dropdownRef.current?.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      dropdownRef.current?.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      dropdownRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  const handleBlur = (event: React.FocusEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.relatedTarget as Node)
    ) {
      setDropdownOpen(false);
    }
  };

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
            }
          )}
        >
          {!isPatternInFieldset && (
            <>
              <div
                className={`${styles.moveToPageWrapper} display-inline-block text-ttop position-relative`}
                ref={dropdownRef}
                onBlur={handleBlur}
              >
                <p
                  className={`${styles.movePatternButton} margin-top-1 display-inline-block text-ttop cursor-pointer`}
                >
                  <button
                    className="usa-button--outline usa-button--unstyled margin-right-0  padding-top-1 padding-left-05 padding-bottom-05"
                    type="button"
                    ref={buttonRef}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen ? 'true' : 'false'}
                    onClick={event => {
                      event.preventDefault();
                      toggleDropdown();
                    }}
                  >
                    <span className="display-inline-block text-ttop">
                      {isFieldset ? 'Move fieldset' : 'Move question'}
                    </span>
                    <svg
                      className="usa-icon display-inline-block text-ttop"
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                    >
                      <use
                        xlinkHref={`${context.uswdsRoot}img/sprite.svg#expand_more`}
                      ></use>
                    </svg>
                  </button>
                </p>
                {dropdownOpen && (
                  <div className={`${styles.dropDown} padding-2`} tabIndex={-1}>
                    <div
                      className={`${styles.moveToPagePosition} margin-bottom-1`}
                    >
                      <label
                        className="usa-label display-inline-block text-ttop margin-right-1"
                        htmlFor="pagenumbers"
                      >
                        Page:
                      </label>
                      <select
                        className="usa-select display-inline-block text-ttop"
                        name="pagenumbers"
                        id="pagenumbers"
                        value={targetPage}
                        onChange={e => setTargetPage(e.target.value)}
                      >
                        <option value="" disabled>
                          Select page
                        </option>
                        {availablePages.map((page, index) => (
                          <option key={page.id} value={page.id}>
                            {page.specialLabel ||
                              page.data.title ||
                              `Page ${index + 2}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className={`${styles.moveToPagePosition} margin-bottom-1`}
                    >
                      <label
                        className="usa-label margin-right-1 display-inline-block text-ttop"
                        htmlFor="elementPosition"
                      >
                        Position:
                      </label>
                      <select
                        className="usa-select display-inline-block text-ttop"
                        name="elementPosition"
                        id="elementPosition"
                        value={moveToPosition}
                        onChange={e =>
                          setMoveToPosition(e.target.value as 'top' | 'bottom')
                        }
                      >
                        <option value="" disabled>
                          Select position
                        </option>
                        <option value="top">Top of page</option>
                        <option value="bottom">Bottom of page</option>
                      </select>
                    </div>
                    <p>
                      <button
                        type="button"
                        aria-label={
                          isFieldset
                            ? 'Move fieldset to another page'
                            : 'Move question to another page'
                        }
                        title={
                          isFieldset
                            ? 'Move fieldset to another page'
                            : 'Move question to another page'
                        }
                        className="usa-button margin-right-0"
                        onClick={handleMovePattern}
                      >
                        {isFieldset ? 'Move fieldset' : 'Move question'}
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
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
              <span className="padding-left-1">{children}</span>
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

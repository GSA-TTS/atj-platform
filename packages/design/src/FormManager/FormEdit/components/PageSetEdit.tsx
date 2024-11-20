import React from 'react';

import { getPattern, type PageSetProps } from '@atj/forms';

import { PatternEditComponent } from '../types.js';

import classNames from 'classnames';
import styles from '../../../Form/components/PageSet/PageMenu/pageMenuStyles.module.css';
import { DraggableList } from './PreviewSequencePattern/DraggableList.js';
import { useFormManagerStore } from '../../store.js';
import { useSearchParams } from 'react-router-dom';
import { UniqueIdentifier } from '@dnd-kit/core';
import { PageMenuProps } from '../../../Form/components/PageSet/PageMenu/PageMenu.js';

const PageSetEdit: PatternEditComponent<PageSetProps> = ({
  context,
  previewProps,
}) => {
  return (
    <div className="grid-row">
      <nav className="tablet:grid-col-3 tablet:padding-y-3 tablet:padding-right-4">
        <PageMenuEdit pages={previewProps.pages} />
      </nav>
      <div
        className="tablet:grid-col-9 tablet:padding-left-4 padding-left-0 padding-bottom-3 padding-top-3 tablet:border-left tablet:border-base-lighter contentWrapper"
        aria-live="polite"
      >
        {previewProps.children}
        <div>
          <div className="margin-top-3 margin-bottom-3">
            <strong>NAVIGATION:</strong> After the current page is completed, go
            to the next page unless a custom rule applies.
          </div>
          <hr className="margin-y-3 border-2px border-base-lighter" />
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
                  xlinkHref={`${context.uswdsRoot}img/sprite.svg#add_circle`}
                ></use>
              </svg>
              Create custom rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageMenuEdit = ({ pages }: PageMenuProps) => {
  const form = useFormManagerStore(state => state.session.form);
  const updatePattern = useFormManagerStore(state => state.updatePattern);
  const pattern = getPattern(form, 'root');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageId =
    pattern.data.pages[Number(searchParams.get('page')) || 0];

  const updatePageOrder = (order: UniqueIdentifier[]) => {
    const pageIndex = order.indexOf(currentPageId);
    updatePattern({
      ...pattern,
      data: {
        ...pattern.data,
        pages: order,
      },
    });
    if (pageIndex !== -1) {
      setSearchParams({
        page: pageIndex.toString(),
      });
    }
  };

  return (
    <div className={`${styles.sideNavWrapper} position-sticky`}>
      <div className={`${styles.sideNav} usa-sidenav`}>
        <DraggableList
          order={pattern.data.pages}
          updateOrder={updatePageOrder}
          presentation="compact"
        >
          {pages.map((page, index) => (
            <div
              key={index}
              className={classNames('usa-sidenav__item', styles.sideNav, {
                'usa-current text-primary': page.selected,
              })}
            >
              <a href={page.url}>{page.title}</a>
            </div>
          ))}
        </DraggableList>
      </div>
    </div>
  );
};

export default PageSetEdit;

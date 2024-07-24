import React from 'react';

import { getPattern, type PageSetProps } from '@atj/forms';

import { PatternEditComponent } from '../types';

import ActionBar from '../../../Form/ActionBar';
import { useRouteParams } from '../../../FormRouter/hooks';
import classNames from 'classnames';
import styles from '../../../Form/components/PageSet/PageMenu/pageMenuStyles.module.css';
import { DraggableList } from './PreviewSequencePattern/DraggableList';
import { useFormManagerStore } from '../../store';
import { useSearchParams } from 'react-router-dom';
import { UniqueIdentifier } from '@dnd-kit/core';
import { PageMenuProps } from '../../../Form/components/PageSet/PageMenu/PageMenu';

const PageSetEdit: PatternEditComponent<PageSetProps> = ({ previewProps }) => {
  const { routeParams, pathname } = useRouteParams();
  return (
    <div className="grid-row">
      <nav className="tablet:grid-col-3 tablet:padding-y-3 tablet:padding-right-4">
        <PageMenuEdit
          pages={previewProps.pages.map((page, index) => {
            const params = new URLSearchParams(routeParams?.toString());
            params.set('page', index.toString());
            return {
              title: page.title,
              selected: page.active,
              url: `#${pathname}?page=${index}`,
            };
          })}
        />
      </nav>
      <div className="tablet:grid-col-9 tablet:padding-left-4 padding-left-0 padding-bottom-3 padding-top-3 tablet:border-left tablet:border-base-lighter contentWrapper">
        {previewProps.children}
        <ActionBar actions={previewProps.actions} />
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

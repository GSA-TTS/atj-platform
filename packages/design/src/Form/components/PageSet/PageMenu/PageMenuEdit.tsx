import React from 'react';
import classNames from 'classnames';
import styles from './pageMenuStyles.module.css';
import { DraggableList } from '../../../../FormManager/FormEdit/components/PreviewSequencePattern/DraggableList';
import { useFormManagerStore } from '../../../../FormManager/store';
import { getPattern } from '@atj/forms';
import { useSearchParams } from 'react-router-dom';

export type PageMenuProps = {
  pages: {
    selected: boolean;
    title: string;
    url: string;
  }[];
};

export const PageMenuEdit = ({ pages }: PageMenuProps) => {
  const form = useFormManagerStore(state => state.session.form);
  const updatePattern = useFormManagerStore(state => state.updatePattern);
  const pattern = getPattern(form, 'root');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageId =
    pattern.data.pages[Number(searchParams.get('page')) || 0];

  return (
    <div className={`${styles.sideNavWrapper} position-sticky`}>
      <ul className={`${styles.sideNav} usa-sidenav`}>
        <DraggableList
          order={pattern.data.pages}
          updateOrder={order => {
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
          }}
        >
          {pages.map((page, index) => (
            <li
              key={index}
              className={classNames(
                'usa-sidenav__item tablet:margin-left-0 margin-left-2',
                styles.sideNav,
                {
                  'usa-current text-primary': page.selected,
                }
              )}
            >
              <a className={`${styles.usaNavLink}`} href={page.url}>
                {page.title}
              </a>
            </li>
          ))}
        </DraggableList>
      </ul>
    </div>
  );
};

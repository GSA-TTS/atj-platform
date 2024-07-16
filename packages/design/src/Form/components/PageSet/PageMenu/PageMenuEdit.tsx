import classNames from 'classnames';
import React from 'react';
import styles from './pageMenuStyles.module.css';
import { DraggableList } from '../../../../FormManager/FormEdit/components/PreviewSequencePattern/DraggableList';
import { useFormManagerStore } from '../../../../FormManager/store';
import { getPattern } from '@atj/forms';

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

  return (
    <div className={`${styles.sideNavWrapper} position-sticky`}>
      <ul className={`${styles.sideNav} usa-sidenav`}>
        <DraggableList
          order={pattern.data.pages}
          updateOrder={order => {
            updatePattern({
              ...pattern,
              data: {
                ...pattern.data,
                pages: order,
              },
            });
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

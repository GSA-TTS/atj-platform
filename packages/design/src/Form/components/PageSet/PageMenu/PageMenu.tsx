import classNames from 'classnames';
import React from 'react';
import styles from './pageMenuStyles.module.css';

export type PageMenuProps = {
  pages: {
    selected: boolean;
    title: string;
    url: string;
  }[];
};

export const PageMenu = ({ pages }: PageMenuProps) => {
  return (
    <div className={`${styles.sideNavWrapper} position-sticky`}>
      <ul className={`${styles.sideNav} usa-sidenav`}>
        {pages.map((page, index) => (
          <li
            key={index}
            className={classNames('usa-sidenav__item', styles.sideNav, {
              'usa-current text-primary': page.selected,
            })}
          >
            <a className={`${styles.usaNavLink}`} href={page.url}>
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

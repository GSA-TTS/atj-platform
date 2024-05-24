import classNames from 'classnames';
import React from 'react';

export type PageMenuProps = {
  pages: {
    selected: boolean;
    title: string;
    url: string;
  }[];
};

export const PageMenu = ({ pages }: PageMenuProps) => {
  return (
    <div>
      <ul className="usa-sidenav">
        <li className="usa-sidenav__item">
          <button className="usa-button usa-button--primary">
            Add New Page
          </button>
        </li>
        {pages.map((page, index) => (
          <li
            key={index}
            className={classNames('usa-sidenav__item', {
              'usa-current': page.selected,
            })}
          >
            <a href={page.url}>{page.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { type PageSetProps } from '@atj/forms';

import { type PatternComponent } from '../..';

const PageSet: PatternComponent<PageSetProps> = props => {
  const location = useLocation();

  return (
    <div className="grid-row grid-gap">
      <nav className="tablet:grid-col-3 bg-primary-lightest">
        <ul className="usa-sidenav">
          {props.pages.map((page, index) => {
            const params = new URLSearchParams(location.search);
            params.set('page', index.toString());
            return (
              <li key={index} className={'usa-sidenav__item'}>
                <a
                  className={classNames({
                    'usa-current': page.active,
                  })}
                  href={`#${location.pathname}?${params.toString()}`}
                >
                  {page.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="tablet:grid-col-9">{props.children}</div>
    </div>
  );
};

export default PageSet;

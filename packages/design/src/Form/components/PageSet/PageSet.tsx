import React from 'react';

import { type PageSetProps } from '@atj/forms';

import { type PatternComponent } from '../..';
import classNames from 'classnames';

const PageSet: PatternComponent<PageSetProps> = props => {
  return (
    <div className="grid-row grid-gap">
      <nav className="tablet:grid-col-3">
        <ul className="usa-sidenav">
          {props.pages.map((page, index) => (
            <li key={index} className="usa-sidenav__item">
              <a
                className={classNames({ 'usa-current': page.active })}
                href={''}
              >
                {page.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="tablet:grid-col-9">{props.children}</div>
    </div>
  );
};

export default PageSet;

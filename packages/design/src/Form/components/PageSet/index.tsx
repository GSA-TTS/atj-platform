import React from 'react';

import { type PageSetProps } from '@atj/forms';

import { type PatternComponent } from '../..';

const PageSet: PatternComponent<PageSetProps> = props => {
  return (
    <>
      <nav className="tablet:grid-col-3">
        <ul className="usa-sidenav">
          <li className="usa-sidenav__item">
            <a className="usa-current" href="">
              Page 1
            </a>
          </li>
          <li className="usa-sidenav__item">
            <a className="usa-current" href="">
              Page 2
            </a>
          </li>
        </ul>
      </nav>
      <div className="tablet:grid-col-9">{props.children}</div>
    </>
  );
};

export default PageSet;

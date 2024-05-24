import React from 'react';
import { useLocation } from 'react-router-dom';

import { type PageSetProps } from '@atj/forms';

import { type PatternComponent } from '../..';
import { useFormManagerStore } from '../../../FormManager/store';
import { PageMenu } from './PageMenu';

const PageSet: PatternComponent<PageSetProps> = props => {
  const location = useLocation();
  const routeParams = useFormManagerStore(state => state.session.routeParams);
  return (
    <div className="grid-row grid-gap">
      <nav className="tablet:grid-col-3 bg-primary-lightest">
        <PageMenu
          pages={props.pages.map((page, index) => {
            const params = new URLSearchParams(routeParams?.toString());
            params.set('page', index.toString());
            return {
              title: page.title,
              selected: page.active,
              url: `#${location.pathname}?page=${index}`,
            };
          })}
        />
      </nav>
      <div className="tablet:grid-col-9">{props.children}</div>
    </div>
  );
};

export default PageSet;

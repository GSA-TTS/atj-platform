import React from 'react';

import { type PageSetProps } from '@atj/forms';

import { PatternEditComponent } from '../types';

import PageSet from '../../../Form/components/PageSet';
import ActionBar from '../../../Form/ActionBar';
import { useRouteParams } from '../../../FormRouter/hooks';

import { PageMenuEdit } from '../../../Form/components/PageSet/PageMenu';

const PageSetEdit: PatternEditComponent<PageSetProps> = ({ previewProps }) => {
  const { routeParams, pathname } = useRouteParams();
  return (
    <div className="grid-row">
      <nav className="tablet:grid-col-3 tablet:padding-y-3 padding-right-4">
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
  return (
    <>
      <p>asdfasdfasdfasdf</p>
      <PageSet {...previewProps} />
    </>
  );
};

export default PageSetEdit;

import React from 'react';

import { type PageSetProps } from '@atj/forms';

import { PatternEditComponent } from '../types';

import PageSet from '../../../Form/components/PageSet';

const PageSetEdit: PatternEditComponent<PageSetProps> = ({ previewProps }) => {

  return (
    <>
      <PageSet {...previewProps} />
    </>
  );
};

export default PageSetEdit;

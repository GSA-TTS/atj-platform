import React from 'react';

import { type PageSetProps } from '@atj/forms';

import { PatternEditComponent } from '../types';

import PageSet from '../../../Form/components/PageSet';
import { useFormManagerStore } from '../../store';

const PageSetEdit: PatternEditComponent<PageSetProps> = ({ previewProps }) => {
  const addPage = useFormManagerStore(state => state.addPage);

  return (
    <>
      <button
        className="usa-button"
        onClick={() => {
          addPage();
        }}
      >
        Add New Page
      </button>
      <PageSet {...previewProps} />
    </>
  );
};

export default PageSetEdit;

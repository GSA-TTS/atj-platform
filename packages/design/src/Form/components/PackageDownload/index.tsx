import React from 'react';

import { type PackageDownloadProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form/index.js';
import ActionBar from '../../../Form/ActionBar/index.js';

const PackageDownload: PatternComponent<PackageDownloadProps> = props => {
  return (
    <>
      <p className="maxw-tablet">{props.text}</p>
      <ActionBar actions={props.actions} />
    </>
  );
};
export default PackageDownload;

import React from 'react';

import { type PageProps } from '@atj/forms';

import { type PatternComponent } from '../../index.js';

const Page: PatternComponent<PageProps> = props => {
  return <>{props.children}</>;
};

export default Page;

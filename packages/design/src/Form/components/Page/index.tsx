import React from 'react';

import { type PageProps } from '@atj/forms';

import { type PatternComponent } from '../..';

const Page: PatternComponent<PageProps> = props => {
  return <>{props.children}</>;
};

export default Page;

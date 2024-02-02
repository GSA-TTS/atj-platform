import React from 'react';
import { AvailableFormList } from '@atj/design';
import { getAppContext } from '../context';
import { getFormUrl } from '../routes';

export default () => {
  const ctx = getAppContext();
  return (
    <AvailableFormList formService={ctx.formService} urlForForm={getFormUrl} />
  );
};

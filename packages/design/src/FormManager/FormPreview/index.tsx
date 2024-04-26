import React from 'react';

import { createFormSession } from '@atj/forms';

import Form from '../../Form';
import { useFormManagerStore } from '../store';

export const FormPreview = () => {
  const context = useFormManagerStore(state => state.context);
  const form = useFormManagerStore(state => state.form);
  const session = createFormSession(form);
  console.log('form');
  return <Form isPreview={true} context={context} session={session} />;
};

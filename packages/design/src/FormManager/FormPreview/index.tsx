import React from 'react';

import Form from '../../Form';
import { useFormManagerStore } from '../store';

export const FormPreview = () => {
  const context = useFormManagerStore(state => state.context);
  const session = useFormManagerStore(state => state.session);
  return <Form isPreview={true} context={context} session={session} />;
};

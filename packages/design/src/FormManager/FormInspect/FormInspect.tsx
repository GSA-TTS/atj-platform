import { useFormManagerStore } from '../store';
import React from 'react';

export const FormInspect = () => {
  const form = useFormManagerStore(state => state.session.form);
  return (
    <pre>
      <code>{JSON.stringify(form, null, 2)}</code>
    </pre>
  );
};

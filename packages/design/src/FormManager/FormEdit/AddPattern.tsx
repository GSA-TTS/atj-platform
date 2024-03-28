import React from 'react';
import { useFormEditStore } from './store';

const AddPattern = () => {
  const addPattern = useFormEditStore(state => state.addPattern);

  return (
    <div>
      <h1>Add a pattern</h1>
      <select>
        <option value="someOption">Some option</option>
        <option value="otherOption">Other option</option>
      </select>
    </div>
  );
};

export default AddPattern;

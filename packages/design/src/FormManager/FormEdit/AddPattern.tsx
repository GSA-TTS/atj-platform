import React from 'react';
import { useFormEditStore } from './store';

export const AddPattern = () => {
  const store = useFormEditStore(state => ({
    availablePatterns: state.availablePatterns,
    addPattern: state.addPattern,
  }));

  return (
    <fieldset>
      <label className="usa-label">
        Add a pattern:
        <select
          className="usa-select"
          onChange={event => {
            store.addPattern(event.target.value);
            event.target.selectedIndex = 0;
          }}
        >
          <option>Add a pattern</option>
          {store.availablePatterns.map((pattern, index) => (
            <option key={index} value={pattern.patternType}>
              {pattern.displayName}
            </option>
          ))}
        </select>
      </label>
    </fieldset>
  );
};

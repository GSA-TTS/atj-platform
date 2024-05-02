import React from 'react';
import { useFormManagerStore } from '../store';

export const AddPatternDropdown = () => {
  const store = useFormManagerStore(state => ({
    availablePatterns: state.availablePatterns,
    addPattern: state.addPattern,
  }));

  return (
    <fieldset className="padding-205 desktop:grid-col-9 mobile:grid-col-12">
      <label className="usa-label margin-top-0">
        Add a pattern
        <select
          className="usa-select"
          onChange={event => {
            store.addPattern(event.target.value);
            event.target.selectedIndex = 0;
          }}
        >
          <option>-- Select a pattern --</option>
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

import React from 'react';

export default function DebugTools() {
  return (
    <p>
      <button
        className="usa-button"
        onClick={() => {
          console.warn('clearing localStorage...');
          window.localStorage.clear();
          window.location.reload();
        }}
      >
        Delete all demo data (clear browser local storage)
      </button>
    </p>
  );
}

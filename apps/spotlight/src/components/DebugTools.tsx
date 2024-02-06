import React from 'react';

export default function DebugTools() {
  return (
    <section>
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
    </section>
  );
}

import React from 'react';

export const Toolbar = ({ uswdsRoot }: { uswdsRoot: string }) => {
  return (
    <div className="display-inline">
      <ToolbarButton
        uswdsRoot={uswdsRoot}
        title="Add question"
        icon="help"
        onClick={() => {}}
      />
      <ToolbarButton
        uswdsRoot={uswdsRoot}
        title="Add text"
        icon="text_fields"
        onClick={() => {}}
      />
      <ToolbarButton
        uswdsRoot={uswdsRoot}
        title="Add section"
        icon="list"
        onClick={() => {}}
      />
    </div>
  );
};

const ToolbarButton = ({
  uswdsRoot,
  title,
  icon,
  onClick,
}: {
  uswdsRoot: string;
  title: string;
  icon: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="usa-button usa-button--unstyled usa-tooltip text-ink"
      title={title}
      data-position="right"
      onClick={onClick}
    >
      <svg
        className="usa-icon usa-icon--size-4"
        aria-hidden="true"
        focusable="false"
        role="img"
      >
        <use xlinkHref={`${uswdsRoot}img/sprite.svg#${icon}`}></use>
      </svg>
    </button>
  );
};

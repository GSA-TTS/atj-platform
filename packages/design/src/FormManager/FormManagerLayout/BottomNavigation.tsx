import React from 'react';

export const BottomNavigation = ({
  back,
  close,
  next,
}: {
  back?: string;
  close?: string;
  next?: string;
}) => {
  return (
    <div className="position-sticky bottom-0 bg-white padding-1">
      <div className="grid-container grid-row display-flex flex-justify-end width-full">
        {back && (
          <a className="usa-button" href={back}>
            Back
          </a>
        )}
        {next && (
          <a className="usa-button" href={next}>
            Next
          </a>
        )}
        {close && (
          <a className="usa-button" href={close}>
            Close
          </a>
        )}
      </div>
    </div>
  );
};

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
    <div className="position-sticky bottom-0 bg-white padding-2 border-top border-bottom border-base-lighter">
      <div className="grid-container grid-row tablet:flex-justify-end flex-justify-center width-full">
        {back && (
          <a className="usa-button usa-button--outline tablet:grid-col-auto grid-col-5" href={back}>
            Back
          </a>
        )}
        {close && (
          <a className="usa-button usa-button--outline tablet:grid-col-auto grid-col-5" href={close}>
            Close
          </a>
        )}
        {next && (
          <a className="usa-button tablet:grid-col-auto grid-col-5" href={next}>
            Next
          </a>
        )}
      </div>
    </div>
  );
};

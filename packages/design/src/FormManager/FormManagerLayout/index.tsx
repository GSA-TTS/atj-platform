import React from 'react';

import { Notifications } from '../Notifications';
import { type NavPage, TopNavigation } from './TopNavigation';
import { BottomNavigation } from './BottomNavigation';

type FormManagerLayoutProps = {
  children?: React.ReactNode;
  step?: NavPage;
  back?: string;
  close?: string;
  next?: string;
  preview?: string;
};

export const FormManagerLayout = ({
  children,
  step,
  back,
  close,
  next,
  preview,
}: FormManagerLayoutProps) => {
  return (
    <>
      <Notifications />
      {step && <TopNavigation curPage={step} preview={preview} />}
      <section className="grid-container usa-section">
        <div className="grid-row flex-justify-center">
          <div className="grid-col-12 tablet:grid-col-10 desktop:grid-col-7">
            <div className="bg-white padding-y-3 padding-x-3">{children}</div>
          </div>
        </div>
      </section>
      {step && <BottomNavigation back={back} next={next} close={close} />}
    </>
  );
};

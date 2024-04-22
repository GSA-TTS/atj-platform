import React from 'react';

import { type NavPage, TopNavigation } from './TopNavigation';
import { BottomNavigation } from './BottomNavigation';

export { NavPage } from './TopNavigation';

type FormManagerLayoutProps = {
  children: React.ReactNode;
  step?: NavPage;
  next?: string;
  back?: string;
  close?: string;
};

export const FormManagerLayout = ({
  children,
  step,
  next,
  back,
  close,
}: FormManagerLayoutProps) => {
  return (
    <>
      {step && <TopNavigation curPage={step} />}
      <section className="grid-container usa-section">
        <div className="grid-row flex-justify-center">
          <div className="grid-col-12 tablet:grid-col-12 desktop:grid-col-12">
            <div className="bg-white padding-y-3 padding-x-3 border border-base-lighter">
              {children}
            </div>
          </div>
        </div>
      </section>
      {step && <BottomNavigation back={back} next={next} close={close} />}
    </>
  );
};

import React from 'react';
import ManagerNav from './ManagerNav';

export const FormManagerLayout = ({
  uswdsRoot,
  children,
}: {
  uswdsRoot: `${string}/`;
  children: React.ReactNode;
}) => {
  return (
    <>
      <ManagerNav uswdsRoot={uswdsRoot} />
      <section className="grid-container usa-section">
        <div className="grid-row flex-justify-center">
          <div className="grid-col-12 tablet:grid-col-12 desktop:grid-col-12">
            <div className="bg-white padding-y-3 padding-x-3 border border-base-lighter">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

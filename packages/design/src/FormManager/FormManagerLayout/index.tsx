import React from 'react';

import { Notifications } from '../Notifications';
import { type NavPage, TopNavigation } from './TopNavigation';
import { BottomNavigation } from './BottomNavigation';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormManagerStore } from '../store';
import styles from './formManagerStyles.module.css';

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
  const location = useLocation();
  const { addNotification } = useFormManagerStore();

  useEffect(() => {
    if (location?.state?.result?.success) {
      addNotification('success', 'Form import was successful.');
    }
  }, []);

  return (
    <>
      <Notifications />
      {step && <TopNavigation curPage={step} preview={preview} />}
      <section className={`${styles.editPage} position-relative`}>
        <div className="grid-row flex-justify-center">
          <div className="grid-col-12">
            <div className="bg-white">{children}</div>
          </div>
        </div>
      </section>
      {step && <BottomNavigation back={back} next={next} close={close} />}
    </>
  );
};

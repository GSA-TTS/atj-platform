import React from 'react';
import classNames from 'classnames';

import { MyForms } from '../routes';
import { useFormManagerStore } from '../store';

export enum NavPage {
  upload = 1,
  create = 2,
  configure = 3,
  publish = 4,
}

const stepClass = (page: NavPage, curPage: NavPage) => {
  if (page < curPage) {
    return 'usa-step-indicator__segment--complete';
  } else if (page === curPage) {
    return 'usa-step-indicator__segment--current';
  } else {
    return '';
  }
};

const srHint = (page: NavPage, curPage: NavPage) => {
  if (page < curPage) {
    return <span className="usa-sr-only">completed</span>;
  } else if (page === curPage) {
    return;
  } else {
    return <span className="usa-sr-only">not completed</span>;
  }
};

export const TopNavigation = ({
  curPage,
  preview,
}: {
  curPage: NavPage;
  preview?: string;
}) => {
  const uswdsRoot = useFormManagerStore(state => state.context.uswdsRoot);
  const lastSaved = useFormManagerStore(state => state.lastSaved);
  return (
    <div className="position-sticky top-0 z-100 bg-white padding-1">
      <div className="grid-container grid-row margin-bottom-105 display-block tablet:display-none">
        <div className="grid-row">
          <div className="grid-col-6">
            <MyFormsLink uswdsRoot={uswdsRoot} />
          </div>
          <div className="grid-col-6 text-base text-right font-ui-3xs padding-left-4">
            <span className="padding-right-2">Saved</span>
            {preview && <PreviewIconLink url={preview} uswdsRoot={uswdsRoot} />}
          </div>
        </div>
        <MobileStepIndicator />
      </div>
      <div className="display-none tablet:display-block margin-top-1 margin-bottom-1">
        <div className="grid-container grid-row">
          <div
            className="grid-col-12 margin-bottom-0 usa-step-indicator"
            aria-label="progress"
          >
            <ol className="usa-step-indicator__segments">
              <li className="margin-right-1 margin-top-1">
                <MyFormsLink uswdsRoot={uswdsRoot} />
              </li>
              <li
                className={classNames(
                  'usa-step-indicator__segment',
                  stepClass(NavPage.upload, curPage)
                )}
              >
                <span className="usa-step-indicator__segment-label">
                  Upload {srHint(NavPage.upload, curPage)}
                </span>
              </li>
              <li
                className={classNames(
                  'usa-step-indicator__segment',
                  stepClass(NavPage.create, curPage)
                )}
              >
                <span className="usa-step-indicator__segment-label">
                  Create {srHint(NavPage.create, curPage)}
                </span>
              </li>
              <li
                className={classNames(
                  'usa-step-indicator__segment',
                  stepClass(NavPage.configure, curPage)
                )}
                aria-current="true"
              >
                <span className="usa-step-indicator__segment-label">
                  Configure {srHint(NavPage.configure, curPage)}
                </span>
              </li>
              <li
                className={classNames(
                  'usa-step-indicator__segment',
                  stepClass(NavPage.publish, curPage)
                )}
              >
                <span className="usa-step-indicator__segment-label">
                  Publish {srHint(NavPage.publish, curPage)}
                </span>
              </li>
              <li>
                <span className="text-base font-ui-3xs padding-left-1 padding-top-2">
                  {lastSaved
                    ? 'Saved ' +
                      lastSaved.toLocaleDateString('en-us', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                      })
                    : 'Blueprint loaded'}
                </span>
                {preview && (
                  <a
                    href={preview}
                    className="usa-button usa-button--outline margin-left-1"
                  >
                    Preview
                  </a>
                )}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyFormsLink = ({ uswdsRoot }: { uswdsRoot: `${string}/` }) => (
  <a href={MyForms.getUrl()} className="usa-link margin-top-3 margin-right-1">
    <svg
      className="usa-icon usa-icon--size-3 text-middle"
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <use xlinkHref={`${uswdsRoot}img/sprite.svg#arrow_back`}></use>
    </svg>
    My Forms
  </a>
);

const PreviewIconLink = ({
  url,
  uswdsRoot,
}: {
  url: string;
  uswdsRoot: `${string}/`;
}) => {
  return (
    <a
      href={url}
      className="usa-link tablet:margin-right-4"
      aria-label="Preview this blueprint"
    >
      <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
        <use xlinkHref={`${uswdsRoot}img/sprite.svg#visibility`}></use>
      </svg>
    </a>
  );
};

const MobileStepIndicator = () => (
  <div className="grid-row grid-gap flex-align-center">
    <div className="grid-col grid-col-4">
      <span className="usa-step-indicator__heading-counter">
        <span className="usa-sr-only">Step</span>
        <span className="usa-step-indicator__current-step">3</span>
        <span className="usa-step-indicator__total-steps">of 5</span>{' '}
      </span>
    </div>
    <div className="grid-col grid-col-8">
      <select className="usa-select" name="options" id="options">
        <option value="value1">Upload</option>
        <option value="value1">Create</option>
        <option selected value="value2">
          Configure
        </option>
        <option value="value3">Public</option>
      </select>
    </div>
  </div>
);

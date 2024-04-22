import React from 'react';
import classNames from 'classnames';

import { useFormEditStore } from '../../FormManager/FormEdit/store';

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

export const TopNavigation = ({ curPage }: { curPage: NavPage }) => {
  const uswdsRoot = useFormEditStore(state => state.context.uswdsRoot);
  return (
    <div className="position-sticky top-0 z-100 bg-white padding-1">
      <div className="grid-container margin-bottom-05 display-block tablet:display-none">
        <MyFormsLink uswdsRoot={uswdsRoot} />
        <span className="text-base font-ui-3xs padding-left-4 padding-right-3">
          Saved
        </span>
        <PreviewIconLink uswdsRoot={uswdsRoot} />
        <MobileStepIndicator />
      </div>
      <div className="grid-container margin-top-2 display-none tablet:display-block">
        <div
          className="usa-step-indicator margin-bottom-105 margin-top-105"
          aria-label="progress"
        >
          <ol className="usa-step-indicator__segments">
            <li>
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
              <span className="text-base font-ui-3xs padding-left-4 padding-right-3">
                Saved at 11:00:03 am on Thur Mar 28
              </span>
              <a href="#" className="usa-button usa-button--outline">
                Preview
              </a>
            </li>
          </ol>
          {/*<ul className="grid-row">
        {(isPreviewPage || isEditPage || isImportDocuments) && (
          <li className={`grid-col ${isEditPage ? 'currentPage' : ''}`}>
            <Link to={`/${formId}/create`}>
              {isImportDocuments ? 'Back to Edit Page' : 'Edit'}
            </Link>
          </li>
        )}
        <li className="grid-col">
          <Link to="/">View all Forms</Link>
        </li>
      </ul>*/}
        </div>
      </div>
    </div>
  );
};

const MyFormsLink = ({ uswdsRoot }: { uswdsRoot: `${string}/` }) => (
  <a href="#" className="usa-link margin-right-4">
    <svg
      className="usa-icon usa-icon--size-3 padding-0 margin-0 margin-right-1"
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <use xlinkHref={`${uswdsRoot}img/sprite.svg#arrow_back`}></use>
    </svg>
    My Forms
  </a>
);

const PreviewIconLink = ({ uswdsRoot }: { uswdsRoot: `${string}/` }) => (
  <a
    href="#"
    className="usa-link margin-right-4"
    aria-label="Preview this blueprint"
  >
    <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
      <use xlinkHref={`${uswdsRoot}img/sprite.svg#visibility`}></use>
    </svg>
  </a>
);

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

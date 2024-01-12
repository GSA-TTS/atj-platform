import React, { PropsWithChildren, useReducer } from 'react';

import { extractFormFieldData, suggestFormDetails } from '@atj/documents';
import { SuggestedForm, UD105_TEST_DATA } from '@atj/documents';

import { onFileInputChangeGetFile } from '../../../lib/file-input';
import { FormView } from '../form/view';

type State = { page: number; suggestedForm?: SuggestedForm };
type Action =
  | { type: 'SELECT_PDF'; data: SuggestedForm }
  | {
      type: 'SAVE_FORM_FIELDS';
      data: SuggestedForm;
    }
  | {
      type: 'GOTO_PAGE';
      page: number;
    };

export const DocumentImporter = () => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      if (action.type === 'SELECT_PDF') {
        return {
          page: 2,
          suggestedForm: action.data,
        };
      }
      if (action.type === 'SAVE_FORM_FIELDS') {
        return {
          page: 3,
          suggestedForm: action.data,
        };
      }
      if (action.type === 'GOTO_PAGE') {
        return {
          ...state,
          page: action.page,
        };
      }
      return state;
    },
    { page: 1 }
  );

  const Step: React.FC<
    PropsWithChildren<{ title: string; step: number; current: number }>
  > = ({ children, title, step, current }) => {
    if (current === step) {
      return (
        <li className="usa-step-indicator__segment usa-step-indicator__segment--current">
          <span className="usa-step-indicator__segment-label">
            {title}
            {children}
          </span>
        </li>
      );
    } else if (current < step) {
      return (
        <li className="usa-step-indicator__segment">
          <span className="usa-step-indicator__segment-label">
            {title}
            {children}
            <span className="usa-sr-only">not completed</span>
          </span>
        </li>
      );
    } else {
      return (
        <li className="usa-step-indicator__segment usa-step-indicator__segment--complete">
          <button
            className="usa-button--unstyled"
            onClick={() => dispatch({ type: 'GOTO_PAGE', page: step })}
          >
            <span className="usa-step-indicator__segment-label">
              {title}
              {children}
              <span className="usa-sr-only">completed</span>
            </span>
          </button>
        </li>
      );
    }
  };

  const PDFFileSelect = () => {
    return (
      <div className="usa-form-group">
        <div className="usa-hint" id="file-input-specific-hint">
          Select a single PDF file
        </div>
        <div className="usa-file-input">
          <div className="usa-file-input__target">
            <div className="usa-file-input__instructions" aria-hidden="true">
              Drag file here or{' '}
              <span className="usa-file-input__choose">choose from folder</span>
            </div>
            <div className="usa-file-input__box"></div>
            <input
              className="usa-file-input__input"
              aria-describedby="file-input-specific-hint"
              type="file"
              accept=".pdf"
              onChange={onFileInputChangeGetFile(async fileDetails => {
                const fieldData = await extractFormFieldData(fileDetails.data);
                const fieldInfo = suggestFormDetails(fieldData);
                dispatch({ type: 'SELECT_PDF', data: fieldInfo });
              })}
            />
          </div>
        </div>
        <label className="usa-label">
          Or use an example file, the UD-105 unlawful detainer response:
          <button
            className="usa-button--unstyled"
            onClick={() => {
              dispatch({ type: 'SELECT_PDF', data: UD105_TEST_DATA });
            }}
          >
            UD-105.pdf
          </button>
        </label>
      </div>
    );
  };

  const ButtonBar = () => {
    return (
      <div>
        <button className="usa-button">Next</button>
      </div>
    );
  };

  const BuildFormPage = () => {
    return (
      <form
        className="usa-form usa-form--large"
        onSubmit={event => {
          dispatch({
            type: 'SAVE_FORM_FIELDS',
            data: state.suggestedForm as SuggestedForm,
          });
        }}
      >
        {/*<EditFieldset fields={state.suggestedForm as SuggestedForm} />*/}
        <ButtonBar />
      </form>
    );
  };
  const PreviewFormPage = () => {
    return (
      <form
        className="usa-form usa-form--large"
        onSubmit={event => {
          dispatch({
            type: 'SAVE_FORM_FIELDS',
            data: state.suggestedForm as SuggestedForm,
          });
        }}
      >
        <FormView prompt={state.suggestedForm as SuggestedForm} />
        <ButtonBar />
      </form>
    );
  };

  return (
    <div>
      <h1>Create an interview from PDF</h1>
      <div className="usa-step-indicator" aria-label="progress">
        <ol className="usa-step-indicator__segments">
          <Step title="Select a PDF" step={1} current={state.page} />
          <Step title="Review document fields" step={2} current={state.page} />
          <Step title="Preview form" step={3} current={state.page} />
        </ol>
      </div>
      {state.page === 1 && <PDFFileSelect />}
      {state.page === 2 && <BuildFormPage />}
      {state.page === 3 && <PreviewFormPage />}
    </div>
  );
};

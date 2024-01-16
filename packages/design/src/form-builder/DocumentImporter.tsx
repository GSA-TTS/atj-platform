import React, { PropsWithChildren, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { addDocument, addDocumentFieldsToForm } from '@atj/documents';
import { createBrowserFormService } from '@atj/form-service';
import {
  type DocumentFieldMap,
  type Form,
  createFormContext,
  createPrompt,
} from '@atj/forms';

import { onFileInputChangeGetFile } from '../util/file-input';
import { FormView } from '../form/FormView';

const DocumentImporter = ({ formId, form }: { formId: string; form: Form }) => {
  const { state, actions } = useDocumentImporter(form);

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
            onClick={() => actions.gotoPage(step)}
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
                actions.stepOneSelectPdfByUpload(fileDetails);
              })}
            />
          </div>
        </div>
        <label className="usa-label">
          Or use an example file, selected for testing purposes:
          <button
            className="usa-button--unstyled"
            onClick={async () => {
              actions.stepOneSelectPdfByUrl(
                'sample-documents/ca-unlawful-detainer/ud105.pdf'
              );
            }}
          >
            sample-documents/ca-unlawful-detainer/ud105.pdf
          </button>
          <button
            className="usa-button--unstyled"
            onClick={async () => {
              actions.stepOneSelectPdfByUrl(
                'sample-documents/alabama-name-change/ps-12.pdf'
              );
            }}
          >
            sample-documents/alabama-name-change/ps-12.pdf
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
          actions.stepTwoConfirmFields();
        }}
      >
        {/*<EditFieldset fields={state.suggestedForm} />*/}
        <ul>
          {Object.values(state.documentFields || {}).map((field, index) => {
            return <li key={index}>{JSON.stringify(field)}</li>;
          })}
        </ul>
        <ButtonBar />
      </form>
    );
  };
  const PreviewFormPage = () => {
    const previewForm = addDocumentFieldsToForm(
      form,
      state.documentFields || {}
    );
    const formContext = createFormContext(previewForm);
    const prompt = createPrompt(formContext);
    return (
      <>
        <FormView
          prompt={prompt}
          onSubmit={data => {
            //handleFormSubmission(formId, data);
            console.log(formId, data);
          }}
        />
        <form
          className="usa-form usa-form--large"
          onSubmit={event => {
            actions.stepThreeSaveForm(formId);
          }}
        >
          <ButtonBar />
        </form>
      </>
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

type State = {
  page: number;
  previewForm: Form;
  documentFields?: DocumentFieldMap;
};

const useDocumentImporter = (form: Form) => {
  const navigate = useNavigate();
  const formService = createBrowserFormService();
  const [state, dispatch] = useReducer(
    (
      state: State,
      action:
        | {
            type: 'SELECT_PDF';
            data: {
              path: string;
              fields: DocumentFieldMap;
              previewForm: Form;
            };
          }
        | {
            type: 'PREVIEW_FORM';
          }
        | {
            type: 'GOTO_PAGE';
            page: number;
          }
    ) => {
      if (action.type === 'SELECT_PDF') {
        return {
          page: 2,
          previewForm: action.data.previewForm,
          documentFields: action.data.fields,
        };
      }
      if (action.type === 'PREVIEW_FORM') {
        return {
          page: 3,
          documentFields: state.documentFields,
          previewForm: state.previewForm,
        };
      }
      if (action.type === 'GOTO_PAGE') {
        return {
          ...state,
          page: action.page,
          previewForm: state.previewForm,
          documentFields: state.documentFields,
        };
      }
      return state;
    },
    {
      page: 1,
      previewForm: form,
    }
  );
  return {
    state,
    actions: {
      async stepOneSelectPdfByUrl(url: string) {
        const completeUrl = `${(import.meta as any).env.BASE_URL}${url}`;
        const response = await fetch(completeUrl);
        const blob = await response.blob();
        const data = new Uint8Array(await blob.arrayBuffer());

        const { newFields, updatedForm } = await addDocument(
          state.previewForm,
          {
            name: url,
            data,
          }
        );
        dispatch({
          type: 'SELECT_PDF',
          data: {
            path: url,
            fields: newFields,
            previewForm: updatedForm,
          },
        });
      },
      async stepOneSelectPdfByUpload(fileDetails: {
        name: string;
        data: Uint8Array;
      }) {
        const { newFields, updatedForm } = await addDocument(
          state.previewForm,
          fileDetails
        );
        dispatch({
          type: 'SELECT_PDF',
          data: {
            path: fileDetails.name,
            fields: newFields,
            previewForm: updatedForm,
          },
        });
      },
      stepTwoConfirmFields() {
        dispatch({
          type: 'PREVIEW_FORM',
        });
      },
      stepThreeSaveForm(formId: string) {
        formService.saveForm(formId, state.previewForm);
        navigate(`/${formId}/edit`);
      },
      gotoPage(step: number) {
        dispatch({ type: 'GOTO_PAGE', page: step });
      },
    },
  };
};

export default DocumentImporter;

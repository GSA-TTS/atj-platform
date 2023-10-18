import React from 'react';
import { generate } from '@atj/documents';

export const downloadPdfBytes = (bytes: Uint8Array) => {
  const base64 = btoa(String.fromCharCode(...bytes));
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:application/pdf;base64,' + encodeURIComponent(base64)
  );
  element.setAttribute('download', 'sample-document.pdf');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const clickHandler = async () => {
  const timestamp = new Date().toISOString();
  const pdfBytes = await generate(`Generated at ${timestamp}`);
  downloadPdfBytes(pdfBytes);
};

export const DocumentAssembler = () => {
  return (
    <div>
      <button className="usa-button" onClick={clickHandler}>
        Generate PDF
      </button>
    </div>
  );
};

import { ChangeEvent } from 'react';

const readFileAsync = (file: File) => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const onFileInputChangeGetFile =
  (setFile: ({ name, data }: { name: string; data: Uint8Array }) => void) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const inputFile = event.target.files[0];
      readFileAsync(inputFile).then(data => {
        setFile({ name: inputFile.name, data: new Uint8Array(data) });
      });
    }
  };

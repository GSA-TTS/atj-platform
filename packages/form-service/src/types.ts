export type FormService = {
  submitForm: (
    formId: string,
    formData: Record<string, string>
  ) => Promise<Result<Uint8Array[]>>;
};

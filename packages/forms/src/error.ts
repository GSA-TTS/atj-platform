type FormErrorType = 'required' | 'custom';

export type FormError =
  | {
      type?: FormErrorType;
      message?: string;
    }
  | undefined;

export type FormErrors = Record<string, FormError>;

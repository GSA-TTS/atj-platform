type FormErrorType = 'required' | 'custom';

export type FormError = {
  type: FormErrorType;
  message?: string;
};

export type FormErrors = Record<string, FormError>;

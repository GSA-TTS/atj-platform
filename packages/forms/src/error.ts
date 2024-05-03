type FormErrorType = 'required' | 'custom';

type FormError = {
  type: FormErrorType;
  message?: string;
};

export type FormErrors = Record<string, FormError>;

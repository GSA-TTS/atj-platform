export type DocumentFieldValue =
  | {
      type: 'TextField';
      name: string;
      label: string;
      value: string;
      instructions?: string;
      maxLength?: number;
      required: boolean;
    }
  | {
      type: 'CheckBox';
      name: string;
      label: string;
      value: boolean;
      instructions?: string;
      required: boolean;
    }
  | {
      type: 'Dropdown';
      name: string;
      label: string;
      value: string[];
      instructions?: string;
      required: boolean;
    }
  | {
      type: 'OptionList';
      name: string;
      label: string;
      value: string[];
      instructions?: string;
      required: boolean;
    }
  | {
      type: 'RadioGroup';
      name: string;
      options: string[];
      label: string;
      value: string;
      instructions?: string;
      required: boolean;
    }
  | {
      type: 'Paragraph';
      name: string;
      options: string[];
      label: string;
      value: string;
      required: boolean;
    }
  | {
      type: 'not-supported';
      name: string;
      error: string;
    };

export type DocumentFieldMap = Record<string, DocumentFieldValue>;

export type DocumentFieldValue =
  | {
      type: 'TextField';
      name: string;
      label: string;
      value: string;
      maxLength?: number;
      required: boolean;
    }
  | {
      type: 'CheckBox';
      name: string;
      label: string;
      value: boolean;
      required: boolean;
    }
  | {
      type: 'Dropdown';
      name: string;
      label: string;
      value: string[];
      required: boolean;
    }
  | {
      type: 'OptionList';
      name: string;
      label: string;
      value: string[];
      required: boolean;
    }
  | {
      type: 'not-supported';
      name: string;
      error: string;
    };

export type DocumentFieldMap = Record<string, DocumentFieldValue>;

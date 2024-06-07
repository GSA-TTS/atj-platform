export type DocumentFieldValue =
  | {
      type: 'TextField';
      name: string;
      label: string;
      value: string;
      maxLength?: number;
      required: boolean;
      page: number;
    }
  | {
      type: 'CheckBox';
      name: string;
      label: string;
      value: boolean;
      required: boolean;
      page: number;
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
      type: 'RadioGroup';
      name: string;
      options: any[];
      label: string;
      value: string;
      required: boolean;
      page: number;
    }
  | {
      type: 'Paragraph';
      name: string;
      options: string[];
      label: string;
      value: string;
      required: boolean;
      page: number;
    }
  | {
      type: 'not-supported';
      name: string;
      error: string;
    };

export type DocumentFieldMap = Record<string, DocumentFieldValue>;

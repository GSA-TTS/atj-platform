export interface Field {
  tag: string;
  type: string;
  name: string;
  id: string;
  class: string;
  value?: string;
  label: string;
  title?: string;
  required?: boolean;
  options?: { name: string; value: string }[]; // For select and radio fields
  items?: { tag: string; content: string }[];
  arialabelledby?: string;
  ariadescribedby?: string;
  linkurl?: string;
}

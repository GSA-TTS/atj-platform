import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

type InterviewError = {
  field: string;
  message: string;
};

const addressSchema = {
  //$schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    address: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string', enum: ['MN', 'WI'] },
    postalCode: { type: 'string', pattern: '^\\d{5}(?:[-\\s]\\d{4})?$' },
  },
  required: ['address', 'city', 'state', 'postalCode'],
  additionalProperties: false,
};

export class InterviewService<T> {
  constructor(schema: typeof addressSchema = addressSchema) {}

  helloWorld(): string {
    return 'Hello, world!';
  }

  validateInterview(interview: any) {
    const validate = ajv.compile(addressSchema);
    validate(interview);
    /* example
    [
      {
        instancePath: '',
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'state' },
        message: "must have required property 'state'"
      }
    ]
    */
    return validate.errors;
  }
}

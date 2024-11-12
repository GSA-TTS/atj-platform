import { describe, expect, it } from 'vitest';
import {
  createPhoneSchema,
  phoneNumberConfig,
  type PhoneNumberPattern,
} from './phone-number';

describe('PhoneNumberPattern tests', () => {
  describe('createPhoneSchema', () => {
    it('should create schema for required phone input', () => {
      const data: PhoneNumberPattern['data'] = {
        label: 'Test Phone Input Label',
        required: true,
      };

      const schema = createPhoneSchema(data);
      const validInput = { phone: '+12223334444' };
      const invalidInput = { phone: '123456abc' };

      expect(schema.safeParse(validInput).success).toBe(true);
      expect(schema.safeParse(invalidInput).success).toBe(false);
    });

    it('should create schema for optional phone input', () => {
      const data: PhoneNumberPattern['data'] = {
        label: 'Test phone Input Label',
        required: false,
      };

      const schema = createPhoneSchema(data);
      const validInput = { phone: '+12223334444' };
      const emptyInput = {};

      expect(schema.safeParse(validInput).success).toBe(true);
      expect(schema.safeParse(emptyInput).success).toBe(true);
    });
  });

  describe('phoneNumberConfig', () => {
    it('should parse user input correctly', () => {
      const pattern: PhoneNumberPattern = {
        type: 'phone-number',
        id: 'test',
        data: {
          label: 'Test Phone Input Label',
          required: true,
        },
      };

      const inputValue = { phone: '+12223334444' };
      if (!phoneNumberConfig.parseUserInput) {
        expect.fail('phoneNumberConfig.parseUserInput is undefined');
      }
      const result = phoneNumberConfig.parseUserInput(pattern, inputValue);
      if (result.success) {
        expect(result.data).toEqual(inputValue);
      } else {
        expect.fail('Unexpected validation failure');
      }
    });

    it('should handle validation error for user input', () => {
      const pattern: PhoneNumberPattern = {
        type: 'phone-number',
        id: 'test',
        data: {
          label: 'Test Phone Input Label',
          required: true,
        },
      };

      const invalidInput = { phone: '123456abc' };
      if (!phoneNumberConfig.parseUserInput) {
        expect.fail('phoneNumberConfig.parseUserInput is undefined');
      }
      const result = phoneNumberConfig.parseUserInput(pattern, invalidInput);
      if (!result.success) {
        expect(result.error).toBeDefined();
      } else {
        expect.fail('Unexpected validation success');
      }
    });

    it('should parse config data correctly', () => {
      const obj = {
        label: 'Test Phone Input Label',
        required: true,
      };

      if (!phoneNumberConfig.parseConfigData) {
        expect.fail('phoneNumberConfig.parseConfigData is undefined');
      }
      const result = phoneNumberConfig.parseConfigData(obj);
      if (result.success) {
        expect(result.data.label).toBe('Test Phone Input Label');
        expect(result.data.required).toBe(true);
      } else {
        expect.fail('Unexpected validation failure');
      }
    });

    it('should handle invalid config data', () => {
      const obj = {
        label: '',
        required: true,
      };

      if (!phoneNumberConfig.parseConfigData) {
        expect.fail('phoneNumberConfig.parseConfigData is undefined');
      }
      const result = phoneNumberConfig.parseConfigData(obj);
      if (!result.success) {
        expect(result.error).toBeDefined();
      } else {
        expect.fail('Unexpected validation success');
      }
    });
  });
});

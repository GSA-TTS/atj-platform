import { describe, expect, it } from 'vitest';
// import {
//   attachmentConfig,
// } from './index.js';

import { type AttachmentPattern, parseConfigData } from './config.js';
//
// import {
//   configSchema as createPatternEditSchema,
// } from './config.js';

describe('AttachmentPattern tests', () => {
  //user input schema
  describe('createPatternEditSchema', () => {
    const defaultData: AttachmentPattern['data'] = {
      'label': 'File upload',
      'required': true,
      'maxAttachments': 1,
      'maxFileSizeMB': 10,
      'allowedFileTypes': [
        'image/jpeg',
        'application/pdf',
        'image/png',
      ],
    };

    it('should create schema for required attachment', () => {
      const data = {
        ...defaultData,
      };

      const input = parseConfigData(data);
      expect(input.success).toBe(true);
    });

    it('should create schema for an optional attachment', () => {
      const data = {
        ...defaultData,
        required: false,
      };

      const input = parseConfigData(data);
      expect(input.success).toBe(true);
    });

    it('should require an at least 1 attachment type', () => {
      const data = {
        ...defaultData,
        'allowedFileTypes': [],
      };

      const input = parseConfigData(data);
      expect((input as any).error).toStrictEqual({
        'allowedFileTypes': {
          'message': 'Invalid file type found.',
          'type': 'required',
        },
      });
    });

    it('should require an at least 1 attachment type', () => {
      const data = {
        ...defaultData,
        'allowedFileTypes': [],
      };

      const input = parseConfigData(data);
      expect((input as any).error).toStrictEqual({
        'allowedFileTypes': {
          'message': 'Invalid file type found.',
          'type': 'required',
        },
      });
    });
  });
});

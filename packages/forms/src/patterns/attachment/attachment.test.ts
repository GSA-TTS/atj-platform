import { describe, expect, it } from 'vitest';
// import {
//   attachmentConfig,
// } from './index.js';

import { type AttachmentPattern, parseConfigData } from './config.js';

describe('AttachmentPattern tests', () => {
  describe('parseConfigData', () => {
    const defaultData: AttachmentPattern['data'] = {
      label: 'File upload',
      required: true,
      maxAttachments: 1,
      maxFileSizeMB: 10,
      allowedFileTypes: ['image/jpeg', 'application/pdf', 'image/png'],
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

    it('should require at least 1 attachment type', () => {
      const data = {
        ...defaultData,
        allowedFileTypes: [],
      };

      const input = parseConfigData(data);
      expect((input as any).error).toStrictEqual({
        allowedFileTypes: {
          message: 'Invalid file type found.',
          type: 'required',
        },
      });
    });

    it('should require a valid attachment type', () => {
      const data = {
        ...defaultData,
        allowedFileTypes: ['invalid/mimetype'],
      };

      const input = parseConfigData(data);
      expect((input as any).error).toStrictEqual({
        allowedFileTypes: {
          message: 'Invalid input',
          type: 'custom',
        },
      });
    });

    it('should not allow humongous files', () => {
      const data = {
        ...defaultData,
        maxFileSizeMB: 10000000,
      };

      const input = parseConfigData(data);
      expect((input as any).error).toStrictEqual({
        maxFileSizeMB: {
          message: 'Number must be less than or equal to 10',
          type: 'custom',
        },
      });
    });

    it('should require positive integer of max attachments', () => {
      const data = {
        ...defaultData,
        maxAttachments: 0,
      };

      const input = parseConfigData(data);
      expect((input as any).error).toStrictEqual({
        maxAttachments: {
          message: 'Number must be greater than 0',
          type: 'custom',
        },
      });
    });
  });
});

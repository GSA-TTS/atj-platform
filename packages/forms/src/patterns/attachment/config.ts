import { z } from 'zod';
import { enLocale as message } from '@atj/common';
import { ParsePatternConfigData } from '../../pattern.js';
import { safeZodParseFormErrors } from '../../util/zod.js';
import { attachmentFileTypeMimes } from './file-type-options';

const configSchema = z.object({
  label: z.string().min(1, message.patterns.attachment.fieldLabelRequired),
  required: z.boolean(),
  maxAttachments: z.coerce.number().gt(0),
  allowedFileTypes: z.union([
    z
      .array(
        z.enum(
          attachmentFileTypeMimes as [(typeof attachmentFileTypeMimes)[number]]
        )
      )
      .nonempty(message.patterns.attachment.errorUnsupportedFileType),
    z.enum(
      attachmentFileTypeMimes as [(typeof attachmentFileTypeMimes)[number]]
    ),
  ]),
});

const validateFileTypes = (fileTypes: string | string[]) => {
  const validTypes = [...attachmentFileTypeMimes] as Array<string>;
  if (typeof fileTypes === 'string') {
    return validTypes.includes(fileTypes);
  }
  return fileTypes.every(type => validTypes.includes(type));
};

const configDataSchema = configSchema.refine(
  data => validateFileTypes(data.allowedFileTypes),
  {
    message: `Invalid file type found. Only ${new Intl.ListFormat('en').format(attachmentFileTypeMimes)} are allowed.`,
  }
);

export type AttachmentConfigSchema = z.infer<typeof configDataSchema>;

export const parseConfigData: ParsePatternConfigData<
  AttachmentConfigSchema
> = obj => {
  return safeZodParseFormErrors(configDataSchema, obj);
};

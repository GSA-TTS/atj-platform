import { z } from 'zod';
import { enLocale as message } from '@atj/common';
import { ParsePatternConfigData } from '../../pattern.js';
import { safeZodParseFormErrors } from '../../util/zod.js';

const ALLOWED_FILETYPES = ['jpg', 'pdf', 'png'] as const;

const configSchema = z.object({
  label: z.string().min(1, message.patterns.attachment.fieldLabelRequired),
  required: z.boolean(),
  maxAttachments: z.coerce.number(),
  allowedFileTypes: z.union([
    z
      .array(z.enum(ALLOWED_FILETYPES))
      .nonempty(message.patterns.attachment.errorUnsupportedFileType),
    z.enum(ALLOWED_FILETYPES),
  ]),
});

const validateFileTypes = (fileTypes: string | string[]) => {
  const validTypes = [...ALLOWED_FILETYPES] as Array<string>;
  if (typeof fileTypes === 'string') {
    return validTypes.includes(fileTypes);
  }
  return fileTypes.every(type => validTypes.includes(type));
};

const configDataSchema = configSchema.refine(
  data => validateFileTypes(data.allowedFileTypes),
  {
    message:
      "Invalid file type found. Only 'pdf', 'jpg', and 'png' are allowed.",
  }
);

export type AttachmentConfigSchema = z.infer<typeof configDataSchema>;

export const parseConfigData: ParsePatternConfigData<
  AttachmentConfigSchema
> = obj => {
  return safeZodParseFormErrors(configDataSchema, obj);
};

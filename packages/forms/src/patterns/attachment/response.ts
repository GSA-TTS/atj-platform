import { z } from 'zod';
import { ParseUserInput } from '../../pattern.js';
import { safeZodParseToFormError } from '../../util/zod.js';
import { type AttachmentPattern } from './config.js';

const isBrowser =
  typeof window !== 'undefined' && typeof window.FileList !== 'undefined';
const convertMBtoBytes = (sizeInMB: number) => {
  return sizeInMB * 1024 * 1024;
};

const createFileListSchema = (data: AttachmentPattern['data']) => {
  const maxFileSizeBytes = convertMBtoBytes(data.maxFileSizeMB);

  // Define the schema for a single file in the FileList
  const fileSchema = z
    .instanceof(File)
    .refine((file: File) => data.allowedFileTypes.includes(file.type), {
      message: `Invalid file type`,
    })
    .refine((file: File) => file.size <= maxFileSizeBytes, {
      message: `Each file must be smaller than ${data.maxFileSizeMB} MB`,
    });

  // Define the schema for the FileList as a whole
  return z
    .custom<FileList>(
      (fileList: FileList) => {
        if (!(fileList instanceof FileList)) {
          return false;
        } else if (data.required && fileList.length === 0) {
          return false;
        } else if (fileList.length > data.maxAttachments) {
          return false;
        }
        return true;
      },
      {
        message:
          data.maxAttachments === 1
            ? `You must provide 1 file`
            : `You must provide between 1 and ${data.maxAttachments} file(s).`,
      }
    )
    .superRefine((fileList: FileList, ctx: z.RefinementCtx) => {
      Array.from(fileList).forEach(file => {
        const result = fileSchema.safeParse(file);
        if (!result.success) {
          result.error.errors.forEach((err: z.ZodIssue) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: err.message,
            });
          });
        }
      });
    });
};

type IsBrowser = typeof window extends typeof globalThis ? true : false;

// Conditionally type this pattern based on environment
export type AttachmentPatternOutput = IsBrowser extends true
  ? z.infer<ReturnType<typeof createFileListSchema>>
  : z.infer<ReturnType<typeof createPostSchema>>;

const createPostSchema = (data: AttachmentPattern['data']) => {
  const maxFileSizeBytes = convertMBtoBytes(data.maxFileSizeMB);

  return z
    .any()
    .refine(
      (items: File[]) => {
        return !(data.required && items.length === 0);
      },
      {
        message: 'This field is required',
      }
    )
    .refine(
      (items: File[]) => {
        return items.every(item => data.allowedFileTypes.includes(item.type));
      },
      {
        message: `Invalid file type`,
      }
    )
    .refine(
      (items: File[]) => {
        return items.length <= data.maxAttachments;
      },
      {
        message: `The maximum number of attachments is ${data.maxAttachments}`,
      }
    )
    .refine(
      (items: File[]) => {
        return items.every(item => item.size <= maxFileSizeBytes);
      },
      {
        message: `The maximum allowable size per file is ${data.maxFileSizeMB}MB`,
      }
    );
};

export const parseUserInput: ParseUserInput<
  AttachmentPattern,
  AttachmentPatternOutput
> = (pattern, obj) => {
  return safeZodParseToFormError(
    isBrowser
      ? createFileListSchema(pattern['data'])
      : createPostSchema(pattern['data']),
    obj
  );
};

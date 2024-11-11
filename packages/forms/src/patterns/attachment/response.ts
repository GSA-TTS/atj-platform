import { z } from 'zod';
import { ParseUserInput } from '../../pattern.js';
import { safeZodParseToFormError } from '../../util/zod.js';
import { type AttachmentPattern } from './config.js';
/**
 * To make this work in both the browser, a suggested approach was to mock the
 * File and FileList in Node.
 */
class NodeFile {
  constructor(
    public type: string,
    public size: number
  ) {}
}

class NodeFileList extends Array<NodeFile> {}

const createSchema = (data: AttachmentPattern['data']) => {
  // Define the maximum file size in bytes
  const maxFileSizeBytes = data.maxFileSizeMB * 1024 * 1024;
  // Determine if we are in the browser environment and set the class to the correct type
  const isBrowser =
    typeof window !== 'undefined' && typeof window.FileList !== 'undefined';
  const FileClass = isBrowser ? File : NodeFile;
  const FileListClass = isBrowser ? FileList : NodeFileList;

  // Define the schema for a single file in the FileList
  const fileSchema = z
    .instanceof(FileClass)
    .refine(
      (file: File | NodeFile) => data.allowedFileTypes.includes(file.type),
      {
        message: `Invalid file type`,
      }
    )
    .refine((file: File | NodeFile) => file.size <= maxFileSizeBytes, {
      message: `Each file must be smaller than ${data.maxFileSizeMB} MB`,
    });

  // Define the schema for the FileList as a whole
  return z
    .custom<FileList | NodeFileList>(
      (fileList: FileList | NodeFileList) => {
        if (!(fileList instanceof FileListClass)) {
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
    .superRefine((fileList: FileList | NodeFileList, ctx: z.RefinementCtx) => {
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

export type AttachmentPatternOutput = z.infer<ReturnType<typeof createSchema>>;

export const parseUserInput: ParseUserInput<
  AttachmentPattern,
  AttachmentPatternOutput
> = (pattern, obj) => {
  return safeZodParseToFormError(createSchema(pattern['data']), obj);
};

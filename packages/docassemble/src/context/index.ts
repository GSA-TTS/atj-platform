import { DocassembleClient, type DocassembleClientContext } from '../client';

export const createDocassembleClient = (ctx: DocassembleClientContext) => {
  return new DocassembleClient(ctx);
};

import { DocassembleClient, type DocassembleClientContext } from '../client.js';

export const createDocassembleClient = (ctx: DocassembleClientContext) => {
  return new DocassembleClient(ctx);
};

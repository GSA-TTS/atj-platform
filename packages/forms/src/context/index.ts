import type { FormRepository } from '@atj/database';
import { type FormConfig } from '../pattern.js';

export type FormServiceContext = {
  db: FormRepository;
  config: FormConfig;
};

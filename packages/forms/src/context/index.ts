import { type FormConfig } from '../pattern.js';
import { type FormRepository } from '../repository/index.js';

export type FormServiceContext = {
  repository: FormRepository;
  config: FormConfig;
};

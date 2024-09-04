import { createInMemoryDatabaseContext } from '@atj/database/context';
import { createFormsRepository } from './repository';
import { defaultFormConfig } from './patterns';

type Options = {
  isUserLoggedIn: () => boolean;
};

export const createTestFormServiceContext = async (opts?: Partial<Options>) => {
  const db = await createInMemoryDatabaseContext();
  const repository = createFormsRepository(db);
  return {
    repository,
    config: defaultFormConfig,
    isUserLoggedIn: opts?.isUserLoggedIn || (() => true),
  };
};

import { failure } from '@atj/common';

import {
  getPatternConfig,
  getPatternSafely,
  validatePattern,
} from '../../pattern';
import { type FormSession } from '../../session';
import { type SubmitHandler } from '../../submission';
import { type PagePattern } from '../page/config';
import { type PageSetPattern } from './config';

const getPage = (formSession: FormSession) => {
  const page = formSession.route?.params.page?.toString();
  return typeof page == 'string' ? Number.parseInt(page) : 0;
};

export const submitPage: SubmitHandler<PageSetPattern> = (config, opts) => {
  const pageNumber = getPage(opts.session);
  const pagePatternId = opts.pattern.data.pages[pageNumber - 1];
  if (pagePatternId) {
    return failure(`Page ${pageNumber} does not exist`);
  }

  const pagePatternConfig = getPatternConfig(config, 'page');
  const pagePattern = getPatternSafely<PagePattern>({
    type: 'page',
    form: opts.session.form,
    patternId: pagePatternId,
  });
  if (!pagePattern.success) {
    return failure(pagePattern.error);
  }

  const result = validatePattern(
    pagePatternConfig,
    pagePattern.data,
    opts.data
  );
  if (!result.success) {
    return failure(result.error);
  }
};

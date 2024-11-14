import { failure, success } from '@atj/common';

import {
  getPatternConfig,
  getPatternSafely,
  validatePatternAndChildren,
} from '../../../pattern';
import { type FormSession } from '../../../session';
import { type SubmitHandler } from '../../../submission';
import { type PagePattern } from '../page/config';
import { type PageSetPattern } from './config';

const getPage = (formSession: FormSession) => {
  const page = formSession.route?.params.page?.toString();
  return typeof page == 'string' ? Number.parseInt(page) : 0;
};

export const submitPage: SubmitHandler<PageSetPattern> = async (
  config,
  opts
) => {
  const pageNumber = getPage(opts.session);
  const pagePatternId = opts.pattern.data.pages[pageNumber];
  if (pagePatternId === undefined) {
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

  const result = validatePatternAndChildren(
    config,
    opts.session.form,
    pagePatternConfig,
    pagePattern.data,
    opts.data
  );

  // Evaluate page rules
  const ruleMatch = pagePattern.data.data.rules
    ? pagePattern.data.data.rules.find(rule => {
        if (rule.condition.operator === '=') {
          const value = opts.session.data.values[rule.patternId];
          if (value === rule.condition.value) {
            return true;
          }
        } else {
          throw new Error(
            `Unsupported rule operator: "${rule.condition.operator}"`
          );
        }
      })
    : undefined;

  // Get the page number for the 1st rule match, or the next page if no rules
  // match.
  const lastPage = opts.pattern.data.pages.length - 1;
  const nextPage =
    Object.values(result.errors).length === 0 && pageNumber < lastPage
      ? ruleMatch
        ? pagePattern.data.data.patterns.indexOf(ruleMatch.patternId)
        : pageNumber + 1
      : pageNumber;

  return success({
    session: {
      ...opts.session,
      data: {
        ...opts.session.data,
        values: {
          ...opts.session.data.values,
          ...result.values,
        },
        errors: {
          ...opts.session.data.errors,
          ...result.errors,
        },
      },
      route: opts.session.route
        ? {
            ...opts.session.route,
            params: {
              ...opts.session.route.params,
              page: nextPage.toString(),
            },
          }
        : undefined,
    },
  });
};

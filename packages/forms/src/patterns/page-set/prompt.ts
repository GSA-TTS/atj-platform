import { z } from 'zod';

import {
  type CreatePrompt,
  type PageSetProps,
  type PromptAction,
  createPromptForPattern,
  getPattern,
} from '../..';
import { type RouteData } from '../../route-data';
import { safeZodParseFormErrors } from '../../util/zod';

import { type PageSetPattern } from './config';
import { type PagePattern } from '../page/config';

export const createPrompt: CreatePrompt<PageSetPattern> = (
  config,
  session,
  pattern,
  options
) => {
  const route = parseRouteData(pattern, session.routeParams);
  const activePage = route.success ? route.data.page : null;
  const children =
    activePage !== null
      ? [
          createPromptForPattern(
            config,
            session,
            getPattern(session.form, pattern.data.pages[activePage]),
            options
          ),
        ]
      : [];
  const actions = getActionsForPage(pattern.data.pages.length, activePage);
  return {
    props: {
      _patternId: pattern.id,
      type: 'page-set',
      actions,
      pages: pattern.data.pages.map((patternId, index) => {
        const childPattern = getPattern(session.form, patternId) as PagePattern;
        if (childPattern.type !== 'page') {
          throw new Error('Page set children must be pages');
        }
        return {
          title: childPattern.data.title || 'Untitled',
          active: index === activePage,
        };
      }),
    } satisfies PageSetProps,
    children,
  };
};

const getRouteParamSchema = (pattern: PageSetPattern) => {
  return z.object({
    page: z.coerce
      .number()
      .min(0)
      .max(pattern.data.pages.length - 1)
      .default(0),
  });
};

const parseRouteData = (pattern: PageSetPattern, routeParams?: RouteData) => {
  const schema = getRouteParamSchema(pattern);
  return safeZodParseFormErrors(schema, routeParams || {});
};

const getActionsForPage = (
  pageCount: number,
  pageIndex: number | null
): PromptAction[] => {
  if (pageIndex === null) {
    return [];
  }
  const actions: PromptAction[] = [];
  if (pageIndex > 0) {
    // FIXME: HACK! Don't do this here. We need to pass the form's ID, or its
    // URL, to createPrompt.
    const pathName = location.hash.split('?')[0];
    actions.push({
      type: 'link',
      text: 'Back',
      url: `${pathName}?page=${pageIndex - 1}`,
    });
  }
  if (pageIndex < pageCount - 1) {
    actions.push({
      type: 'submit',
      submitAction: 'next',
      text: 'Next',
    });
  } else {
    actions.push({
      type: 'submit',
      submitAction: 'submit',
      text: 'Submit',
    });
  }
  return actions;
};

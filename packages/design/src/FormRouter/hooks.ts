import { useLocation } from 'react-router-dom';

import {
  type RouteData,
  getRouteDataFromQueryString,
} from '@atj/forms/src/route-data';

export const useRouteParams = (): RouteData => {
  const location = useLocation();
  const queryString = location.search.startsWith('?')
    ? location.search.substring(1)
    : location.search;
  return {
    routeParams: getRouteDataFromQueryString(queryString),
    pathname: location.pathname,
  };
};

export const useQueryString = (): string => {
  const location = useLocation();
  const queryString = location.search.startsWith('?')
    ? location.search.substring(1)
    : location.search;
  return queryString;
};

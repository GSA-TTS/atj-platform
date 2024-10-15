import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { type RouteData, getRouteDataFromQueryString } from '@atj/forms';

export const useRouteParams = (): {
  params: RouteData;
  url: string;
} => {
  const location = useLocation();
  const params = useMemo(() => {
    const queryString = location.search.startsWith('?')
      ? location.search.substring(1)
      : location.search;
    return getRouteDataFromQueryString(queryString);
  }, [location.search]);
  return {
    params,
    url: `#${location.pathname}`,
  };
};

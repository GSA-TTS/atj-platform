import qs from 'qs';
import { PatternId } from './pattern.js';

export type RouteData = qs.ParsedQs;

export const getRouteDataFromQueryString = (queryString: string): RouteData => {
  return qs.parse(queryString, { allowDots: true });
};

export const getPatternRouteData = (
  routeData: RouteData,
  patternId: PatternId
) => {
  return routeData[patternId] || {};
};

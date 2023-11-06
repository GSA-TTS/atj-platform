export const mapValues = <T, K extends keyof any, V>(
  obj: Record<K, T>,
  mapFn: (value: T) => V
): Record<K, V> => {
  const result: Record<K, V> = {} as Record<K, V>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = mapFn(obj[key]);
    }
  }
  return result;
};

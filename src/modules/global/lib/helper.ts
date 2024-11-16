export const objectMap = <V, R>(
  obj: Record<string, V>,
  callback: (value: V, key: string) => R
): Record<string, R> =>
  Object.entries(obj).reduce(
    (result, [key, value]) => ({ ...result, [key]: callback(value, key) }),
    {} as Record<string, R>
  );

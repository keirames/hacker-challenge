import { inspect } from 'util';

export const format = (x: unknown): string => {
  // we're trying to mimic console.log, so we avoid wrapping strings in quotes
  // console.log('string') -> string
  return typeof x === 'string' ? x : inspect(x);
};

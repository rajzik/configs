import { GQL_EXT_PATTERN } from '@rajzik/configs-shared';

export const interfaceVersion = 2;

export function resolve(source: string): { found: boolean; path?: unknown } {
  if (GQL_EXT_PATTERN.test(source)) {
    return { found: true, path: null };
  }

  return { found: false };
}

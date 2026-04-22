import type * as dng from 'danger';

declare global {
  const danger: typeof dng.danger;
  const message: typeof dng.message;
  const warn: typeof dng.warn;
  const fail: typeof dng.fail;
  // Globally defined by Jasmine (Jest)
}

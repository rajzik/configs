import type { DangerDSLType } from 'danger/distribution/dsl/DangerDSL';

declare global {
  const danger: DangerDSLType;
  function fail(message: string, file?: string, line?: number): void;
  function warn(message: string, file?: string, line?: number): void;
  function message(message: string, file?: string, line?: number): void;
}

export type __DangerGlobalDeclarations = true;

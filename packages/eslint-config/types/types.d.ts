declare module 'eslint-plugin-import' {
  import type { Linter, Rule } from 'eslint';

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module 'eslint-plugin-react' {
  import type { Linter, Rule } from 'eslint';

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    all: { rules: Linter.RulesRecord };
    'jsx-runtime': { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module '@vitest/eslint-plugin' {
  import type { Linter, Rule } from 'eslint';

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    all: { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module 'eslint-plugin-react-hooks' {
  import type { Linter, Rule } from 'eslint';

  export const configs: {
    recommended: {
      rules: {
        'rules-of-hooks': Linter.RuleEntry;
        'exhaustive-deps': Linter.RuleEntry;
      };
    };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module 'eslint-plugin-jsx-a11y' {
  import type { Linter, Rule } from 'eslint';

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module 'eslint-config-prettier' {
  import type { Config } from 'eslint';

  const config: Config;
  export default config;
}

declare module 'eslint-plugin-testing-library' {
  import type { Linter } from 'eslint';

  export const configs: {
    'flat/react': { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module '@next/eslint-plugin-next' {
  import type { Linter } from 'eslint';

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    'core-web-vitals': { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module 'eslint-plugin-tailwindcss' {
  import type { Linter } from 'eslint';

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    'flat/recommended': { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module 'tailwind-csstree' {
  import type { NodeSyntaxConfig } from '@eslint/css-tree';

  export const tailwind3: Partial<NodeSyntaxConfig>;
  export const tailwind4: Partial<NodeSyntaxConfig>;
}

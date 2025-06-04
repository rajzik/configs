import type { ConfigArray } from 'typescript-eslint';

import tailwind from 'eslint-plugin-tailwindcss';

const config: ConfigArray = [
  {
    plugins: {
      tailwind,
    },
    rules: {
      ...tailwind.configs['flat/recommended'].rules,
      // Tailwind
      'tailwind/no-custom-classname': [
        'warn',
        {
          callees: ['twMerge', 'classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
        },
      ],
      'tailwind/no-unnecessary-arbitrary-value': 'error',
      'tailwind/no-contradicting-classname': 'error',
      'tailwind/enforces-shorthand': 'error',
    },
  },
  {
    settings: {
      tailwindcss: {
        callees: ['twMerge', 'classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
      },
    },
  },
];

export default config;

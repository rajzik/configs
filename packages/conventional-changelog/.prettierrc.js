import config from '@rajzik/prettier-config';

export default {
  ...config,
  overrides: [
    {
      files: '**/*.hbs',
      options: {
        parser: 'angular',
      },
    },
  ],
};

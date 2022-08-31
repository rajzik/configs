import type eslint from 'eslint';

const jestRules: eslint.Linter.Config['rules'] = {
  // override ESLint rules
  'max-classes-per-file': 'off',

  // override eslint-plugin-node rules
  'node/no-sync': 'off', // disallow synchronous methods

  // override @typescript-eslint/eslint-plugin rules
  '@typescript-eslint/ban-ts-comment': 'off', // bans // @ts-<directive> comments from being used
  '@typescript-eslint/no-floating-promises': 'off', // requires Promise-like values to be handled appropriately
  '@typescript-eslint/require-await': 'off', // disallow async functions which have no await expression
  '@typescript-eslint/unbound-method': 'off', // enforces unbound methods are called with their expected scope

  // eslint-plugin-jest
  'jest/consistent-test-it': 'off', // have control over test and it usages
  'jest/expect-expect': 'warn', // enforce assertion to be made in a test body
  'jest/max-nested-describe': ['error', { max: 3 }], // enforces a maximum depth to nested describe calls
  'jest/no-alias-methods': 'error', // disallow alias methods
  'jest/no-commented-out-tests': 'warn', // disallow commented out tests
  'jest/no-conditional-expect': 'error', // prevent calling expect conditionally
  'jest/no-conditional-in-test': 'off', // disallow conditional logic in tests
  'jest/no-deprecated-functions': 'error', // disallow use of deprecated functions
  'jest/no-disabled-tests': 'warn', // disallow disabled tests
  'jest/no-done-callback': 'warn', // avoid using a callback in asynchronous tests and hooks
  'jest/no-duplicate-hooks': 'error', // disallow duplicate setup and teardown hooks
  'jest/no-export': 'error', // disallow using exports in files containing tests
  'jest/no-focused-tests': 'error', // disallow focused tests
  'jest/no-hooks': 'off', // disallow setup and teardown hooks
  'jest/no-identical-title': 'error', // disallow identical titles
  'jest/no-interpolation-in-snapshots': 'error', // disallow string interpolation inside snapshots
  'jest/no-jasmine-globals': 'error', // disallow Jasmine globals
  'jest/no-large-snapshots': 'off', // disallow large snapshots
  'jest/no-mocks-import': 'error', // disallow manually importing from __mocks__
  'jest/no-restricted-matchers': 'off', // disallow specific matchers & modifiers
  'jest/no-standalone-expect': 'error', // disallow using expect outside of it or test blocks
  'jest/no-test-prefixes': 'error', // use .only and .skip over f and x
  'jest/no-test-return-statement': 'error', // disallow explicitly returning from tests
  'jest/prefer-called-with': 'warn', // suggest using toBeCalledWith() or toHaveBeenCalledWith()
  'jest/prefer-comparison-matcher': 'warn', // suggest using the built-in comparison matchers
  'jest/prefer-equality-matcher': 'warn', // suggest using the built-in equality matchers
  'jest/prefer-expect-assertions': 'off', // suggest using expect.assertions() OR expect.hasAssertions()
  'jest/prefer-expect-resolves': 'error', // prefer await expect(...).resolves over expect(await ...) syntax
  'jest/prefer-hooks-on-top': 'warn', // suggest having hooks before any test cases
  'jest/prefer-hooks-in-order': 'error', // While hooks can be setup in any order, they're always called by jest in this specific order
  'jest/prefer-lowercase-title': 'off', // enforce lowercase title
  'jest/prefer-snapshot-hint': 'off', // prefer including a hint with external snapshots
  'jest/prefer-spy-on': 'error', // suggest using jest.spyOn()
  'jest/prefer-strict-equal': 'off', // suggest using toStrictEqual()
  'jest/prefer-to-be': 'warn', // suggest using toBe() for primitive literals
  'jest/prefer-to-contain': 'warn', // suggest using toContain()
  'jest/prefer-to-have-length': 'warn', // suggest using toHaveLength()
  'jest/prefer-todo': 'warn', // suggest using test.todo
  'jest/require-hook': 'warn', // require setup and teardown code to be within a hook
  'jest/require-to-throw-message': 'error', // require a message for toThrow()
  'jest/require-top-level-describe': 'error', // require test cases and hooks to be inside a describe block
  'jest/unbound-method': 'error', // enforces unbound methods are called with their expected scope
  'jest/valid-describe-callback': 'error', // enforce valid describe() callback
  'jest/valid-expect': ['error', { alwaysAwait: true }], // enforce valid expect() usage
  'jest/valid-expect-in-promise': 'error', // enforce having return statement when testing with promises
  'jest/valid-title': 'warn', // enforce valid titles
};

const testingLibraryRules: eslint.Linter.Config['rules'] = {
  // eslint-plugin-testing-library
  'testing-library/await-async-query': 'error', // enforce async queries to have proper await
  'testing-library/await-async-utils': 'error', // enforce async utils to be awaited properly
  'testing-library/await-fire-event': 'off', // enforce async fire event methods to be awaited
  'testing-library/consistent-data-testid': 'off', // ensure data-testid values match a provided regex
  'testing-library/no-await-sync-events': 'error', // disallow unnecessary await for sync events
  'testing-library/no-await-sync-query': 'error', // disallow unnecessary await for sync queries
  'testing-library/no-container': 'warn', // disallow the use of container methods
  'testing-library/no-debugging-utils': 'warn', // disallow the use of debug
  'testing-library/no-dom-import': ['error', 'react'], // disallow importing from DOM Testing Library
  'testing-library/no-global-regexp-flag-in-query': 'error', // Ensure that there are no global RegExp flags used when using queries
  'testing-library/no-manual-cleanup': 'off', // disallow the use of cleanup
  'testing-library/no-node-access': 'error', // disallow direct Node access
  'testing-library/no-promise-in-fire-event': 'error', // disallow the use of promises passed to a fireEvent method
  'testing-library/no-render-in-setup': 'off', // disallow the use of render in setup functions
  'testing-library/no-unnecessary-act': 'error', // disallow wrapping Testing Library utils or empty callbacks in act
  'testing-library/no-wait-for-empty-callback': 'off', // disallow empty callbacks for waitFor and waitForElementToBeRemoved
  'testing-library/no-wait-for-multiple-assertions': 'warn', // disallow the use of multiple expect inside waitFor
  'testing-library/no-wait-for-side-effects': 'warn', // disallow the use of side effects inside waitFor
  'testing-library/no-wait-for-snapshot': 'warn', // ensures no snapshot is generated inside of a waitFor call
  'testing-library/prefer-explicit-assert': 'warn', // suggest using explicit assertions rather than just getBy* queries
  'testing-library/prefer-find-by': 'warn', // suggest using findBy* methods instead of the waitFor + getBy queries
  'testing-library/prefer-presence-queries': 'off', // enforce specific queries when checking element is present or not
  'testing-library/prefer-query-by-disappearance': 'warn', // suggest using queryBy* queries when waiting for disappearance
  'testing-library/prefer-user-event': 'warn', // suggest using userEvent library instead of fireEvent for simulating user interaction
  'testing-library/prefer-screen-queries': 'off', // suggest using screen while using queries
  'testing-library/prefer-wait-for': 'error', // use waitFor instead of deprecated wait methods
  'testing-library/render-result-naming-convention': 'warn', // enforce a valid naming for return value from render
};

const config = {
  ...jestRules,
  ...testingLibraryRules,
};

export default config;

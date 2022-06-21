import type eslint from 'eslint';

const futureRules: eslint.Linter.Config['rules'] = {
  // eslint-plugin-unicorn rules
  'unicorn/no-array-for-each': 'off', // prefer for…of over Array#forEach(…)
  'unicorn/no-array-method-this-argument': 'error', // disallow using the this argument in array methods
  'unicorn/no-array-reduce': 'off', // disallow Array#reduce() and Array#reduceRight()
  'unicorn/no-await-expression-member': 'off', // forbid member access from await expression
  'unicorn/no-invalid-remove-event-listener': 'error', // prevent calling EventTarget#removeEventListener() with the result of an expression
  'unicorn/no-keyword-prefix': 'off', // disallow identifiers starting with new or class
  'unicorn/no-lonely-if': 'warn', // disallow if statements as the only statement in if blocks without else
  'unicorn/no-new-array': 'error', // disallow new Array()
  'unicorn/no-new-buffer': 'error', // enforce the use of Buffer.from() and Buffer.alloc() instead of the deprecated new Buffer()
  'unicorn/no-object-as-default-parameter': 'error', // disallow the use of objects as default parameters
  'unicorn/no-process-exit': 'off', // disallow process.exit()
  'unicorn/no-static-only-class': 'error', // forbid classes that only have static members
  'unicorn/no-thenable': 'error', // disallow then property
  'unicorn/no-this-assignment': 'off', // disallow assigning this to a variable
  'unicorn/no-unsafe-regex': 'warn', // disallow unsafe regular expressions
  'unicorn/no-unused-properties': 'off', // disallow unused object properties
  'unicorn/no-useless-fallback-in-spread': 'error', // forbid useless fallback when spreading in object literals
  'unicorn/no-useless-length-check': 'off', // disallow useless array length check
  'unicorn/no-useless-promise-resolve-reject': 'error', // disallow returning/yielding Promise.resolve/reject() in async functions or promise callbacks
  'unicorn/no-useless-spread': 'error', // disallow unnecessary spread
  'unicorn/no-useless-switch-case': 'error', // disallow unnecessary switch cases
  'unicorn/no-useless-undefined': 'off', // disallow useless undefined
  'unicorn/no-zero-fractions': 'error', // disallow number literals with zero fractions or dangling dots
  'unicorn/number-literal-case': 'error', // enforce lowercase identifier and uppercase value for number literals
  'unicorn/numeric-separators-style': 'off', // enforce the style of numeric separators by correctly grouping digits
  'unicorn/prefer-add-event-listener': 'error', // prefer .addEventListener() and .removeEventListener() over on-functions
  'unicorn/prefer-array-find': 'warn', // prefer .find(…) over the first element from .filter(…)
  'unicorn/prefer-array-flat': 'warn', // prefer Array#flat() over legacy techniques to flatten arrays
  'unicorn/prefer-array-flat-map': 'warn', // prefer .flatMap(…) over .map(…).flat()
  'unicorn/prefer-array-index-of': 'warn', // prefer Array#indexOf() over Array#findIndex() when looking for the index of an item
  'unicorn/prefer-array-some': 'warn', // prefer .some(…) over .find(…)
  'unicorn/prefer-at': 'warn', // prefer .at() method for index access and String#charAt()
  'unicorn/prefer-code-point': 'warn', // prefer String#codePointAt(…) over String#charCodeAt(…) and String.fromCodePoint(…) over String.fromCharCode(…)
  'unicorn/prefer-native-coercion-functions': 'error', // prefer native coercion functions
  'unicorn/prefer-date-now': 'warn', // prefer Date.now() to get the number of milliseconds since the Unix Epoch
  'unicorn/prefer-default-parameters': 'error', // prefer default parameters over reassignment
  'unicorn/prefer-dom-node-append': 'warn', // prefer Node#append() over Node#appendChild()
  'unicorn/prefer-dom-node-dataset': 'warn', // prefer using .dataset on DOM elements over .setAttribute(…)
  'unicorn/prefer-dom-node-remove': 'warn', // prefer childNode.remove() over parentNode.removeChild(childNode)
  'unicorn/prefer-dom-node-text-content': 'warn', // prefer .textContent over .innerText
  'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }], // prefer export…from when re-exporting
  'unicorn/prefer-includes': 'warn', // prefer .includes() over .indexOf() when checking for existence or non-existence
  'unicorn/prefer-json-parse-buffer': 'off', // prefer reading a JSON file as a buffer
  'unicorn/prefer-keyboard-event-key': 'warn', // prefer KeyboardEvent#key over KeyboardEvent#keyCode
  'unicorn/prefer-math-trunc': 'warn', // enforce the use of Math.trunc instead of bitwise operators
  'unicorn/prefer-modern-dom-apis': 'error',
  'unicorn/prefer-modern-math-apis': 'error',
  // FIXME [@rajzik]: This is good rule but adoption isn't great so far
  'unicorn/prefer-module': 'off', // Prefer JavaScript modules (ESM) over CommonJS
  'unicorn/prefer-node-protocol': 'warn', // Prefer using the `node:` protocol when importing Node.js builtin modules
  'unicorn/prefer-negative-index': 'warn', // prefer negative index over .length - index for {String,Array,TypedArray}#slice() and Array#splice()
  'unicorn/prefer-number-properties': 'warn', // prefer Number static properties over global ones
  'unicorn/prefer-object-from-entries': 'warn', // prefer using Object.fromEntries(…) to transform a list of key-value pairs into an object
  'unicorn/prefer-optional-catch-binding': 'off', // prefer omitting the catch binding parameter
  'unicorn/prefer-prototype-methods': 'warn', // prefer borrowing methods from the prototype instead of the instance
  'unicorn/prefer-query-selector': 'off', // prefer .querySelector() over .getElementById(), .querySelectorAll() over .getElementsByClassName() and .getElementsByTagName()
  'unicorn/prefer-reflect-apply': 'off', // prefer Reflect.apply() over Function#apply()
  'unicorn/prefer-regexp-test': 'warn', // prefer RegExp#test() over String#match() and RegExp#exec()
  'unicorn/prefer-set-has': 'warn', // prefer Set#has() over Array#includes() when checking for existence or non-existence
  'unicorn/prefer-spread': 'error', // prefer the spread operator over Array.from()
  'unicorn/prefer-string-replace-all': 'warn', // prefer String#replaceAll() over regex searches with the global flag
  'unicorn/prefer-string-slice': 'warn', // prefer String#slice() over String#substr() and String#substring()
  'unicorn/prefer-string-starts-ends-with': 'warn', // prefer String#startsWith() & String#endsWith() over more complex alternatives
  'unicorn/prefer-string-trim-start-end': 'warn', // prefer String#trimStart() / String#trimEnd() over String#trimLeft() / String#trimRight()
  'unicorn/prefer-switch': 'off', // prefer switch over multiple else-if
  'unicorn/prefer-ternary': 'off', // prefer ternary expressions over simple if-else statements
  'unicorn/prefer-top-level-await': 'error', // prefer top-level await over top-level promises and async function calls
  'unicorn/prefer-type-error': 'warn', // enforce throwing TypeError in type checking conditions
  'unicorn/prevent-abbreviations': 'off', // Prevent abbreviations
  'unicorn/relative-url-style': 'off', // enforce consistent relative URL style
  'unicorn/require-array-join-separator': 'error', // enforce using the separator argument with Array#join()
  'unicorn/require-number-to-fixed-digits-argument': 'error', // enforce using the digits argument with Number#toFixed()
  'unicorn/require-post-message-target-origin': 'error', // enforce using the targetOrigin argument with window.postMessage()
  'unicorn/string-content': 'off', // enforce better string content
  'unicorn/template-indent': 'off', // fix whitespace-insensitive template indentation
  'unicorn/text-encoding-identifier-case': 'warn', // enforce consistent case for text encoding identifiers
  'unicorn/throw-new-error': 'error', // require new when throwing an error
};

export default futureRules;

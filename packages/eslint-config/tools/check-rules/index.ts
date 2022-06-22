import { allRules } from './allRules';

import jestRulesConfig from '../../src/rules/jest-rules';
import nodeRulesConfig from '../../src/rules/node';
import baseRulesConfig from '../../src/rules/base';
import reactRulesConfig from '../../src/rules/react';
import typescriptRulesPreset from '../../src/presets/typescript';
import unicornPreset from '../../src/presets/future';

import prettierConfig from '../../src/presets/prettier';


const jestRules = Object.entries(jestRulesConfig!).map(([ruleName]) => ruleName);
const nodeRules = Object.entries(nodeRulesConfig!).map(([ruleName]) => ruleName);
const prettierRules = Object.entries(prettierConfig.rules!).map(([ruleName]) => ruleName);
const baseRules = Object.entries(baseRulesConfig!).map(([ruleName]) => ruleName);
const reactRules = Object.entries(reactRulesConfig!).map(([ruleName]) => ruleName);

const typescriptRules = Object.entries(typescriptRulesPreset!.overrides![0]!.rules!).map(
  ([ruleName]) => ruleName,
);
const unicornRules = Object.entries(unicornPreset.rules!).map(([ruleName]) => ruleName);

const usedRules = [
  ...jestRules,
  ...nodeRules,
  ...prettierRules,
  ...baseRules,
  ...reactRules,
  ...typescriptRules,
  ...unicornRules,
].sort();

const missingRules: string[] = [];

allRules.forEach((ruleName) => {
  if (!usedRules.includes(ruleName)) {
    missingRules.push(ruleName);
  }
});

missingRules.sort();

const deprecatedRules: string[] = [];

usedRules.forEach((ruleName) => {
  if (!allRules.includes(ruleName)) {
    deprecatedRules.push(ruleName);
  }
});

deprecatedRules.sort();

console.log('Deprecated rules:', deprecatedRules);
console.log('Missing rules:', missingRules);

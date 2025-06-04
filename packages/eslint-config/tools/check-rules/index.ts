import esnextPreset from '../../src/presets/esnext';
import prettierConfig from '../../src/presets/prettier';
import typescriptRulesPreset from '../../src/presets/typescript';
import baseRulesConfig from '../../src/rules/base';
import jestRulesConfig from '../../src/rules/jest-rules';
import nodeRulesConfig from '../../src/rules/node';
import reactRulesConfig from '../../src/rules/react';
import { allRules } from './allRules';

const jestRules = Object.entries(jestRulesConfig!).map(([ruleName]) => ruleName);
const nodeRules = Object.entries(nodeRulesConfig!).map(([ruleName]) => ruleName);
const prettierRules = Object.entries(prettierConfig.rules!).map(([ruleName]) => ruleName);
const baseRules = Object.entries(baseRulesConfig!).map(([ruleName]) => ruleName);
const reactRules = Object.entries(reactRulesConfig!).map(([ruleName]) => ruleName);

const typescriptRules = Object.entries(typescriptRulesPreset!.overrides![0]!.rules!).map(
  ([ruleName]) => ruleName,
);
const esnextRules = Object.entries(esnextPreset.rules!).map(([ruleName]) => ruleName);

const usedRules = [
  ...jestRules,
  ...nodeRules,
  ...prettierRules,
  ...baseRules,
  ...reactRules,
  ...typescriptRules,
  ...esnextRules,
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

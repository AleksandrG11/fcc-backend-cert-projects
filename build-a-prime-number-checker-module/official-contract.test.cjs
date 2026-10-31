'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const source = fs.readFileSync(require.resolve('./index.js'), 'utf8');
const pkg = require('./package.json');
const { isPrime } = require('./index.js');

test('freeCodeCamp certification-project AST and npm metadata contract', () => {
  assert.match(source, /function\s+isPrime\s*\(/);
  assert.match(source, /module\.exports\s*=/);
  for (const key of ['name', 'version', 'description', 'license', 'author']) {
    assert.equal(typeof pkg[key], 'string', key);
  }
  assert.ok(Array.isArray(pkg.keywords));
  assert.equal(pkg.type, 'commonjs');
  assert.equal(typeof isPrime, 'function');
});
test('official primality contract with invalid and large edge cases', () => {
  for (const n of [2, 3, 5, 7, 11, 97, 104729]) assert.equal(isPrime(n), true);
  for (const n of [-2, 0, 1, 4, 9, 25, 104730, 2.5, NaN, Infinity, '7']) {
    assert.equal(isPrime(n), false);
  }
});

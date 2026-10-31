const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isPrime } = require('./index.js');
const core = require('./prime-core.js');

test('browser and Node exports have identical behavior through the shared core', () => {
  assert.equal(typeof isPrime, 'function');
  assert.equal(typeof core.isPrime, 'function');
  for (const n of [undefined, null, -3, 0, 1, 2, 3, 4, 97, 7919, NaN, Infinity, '97']) {
    assert.equal(isPrime(n), core.isPrime(n), String(n));
  }
});
test('edge cases and safe-integer checks', () => {
  for (const n of [undefined, null, NaN, Infinity, -1, 0, 1, 4, 9, 25, 1000000008, Number.MAX_SAFE_INTEGER + 1, '97', 2.5]) {
    assert.equal(isPrime(n), false, String(n));
  }
  for (const n of [2, 3, 5, 97, 7919, 1000000007]) {
    assert.equal(isPrime(n), true, String(n));
  }
});

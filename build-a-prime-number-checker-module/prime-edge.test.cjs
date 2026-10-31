const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isPrime } = require('./index.js');
const core = require('./prime-core.js');

test('browser and Node exports use the same implementation', () => {
  assert.equal(isPrime, core.isPrime);
});
test('edge cases and safe-integer checks', () => {
  for (const n of [undefined, null, NaN, Infinity, -1, 0, 1, 4, 9, 25, 1000000008, Number.MAX_SAFE_INTEGER + 1, '97', 2.5]) {
    assert.equal(isPrime(n), false, String(n));
  }
  for (const n of [2, 3, 5, 97, 7919, 1000000007]) {
    assert.equal(isPrime(n), true, String(n));
  }
});

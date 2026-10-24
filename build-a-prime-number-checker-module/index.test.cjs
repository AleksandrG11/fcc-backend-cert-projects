const test = require('node:test');
const assert = require('node:assert/strict');
const { isPrime } = require('./index.js');

test('correctly identifies prime numbers', () => {
  for (const n of [2, 3, 5, 7, 11, 13, 97, 7919, 104729]) {
    assert.equal(isPrime(n), true, String(n));
  }
});

test('rejects composite numbers and edge cases', () => {
  for (const n of [-5, 0, 1, 4, 9, 15, 100, 104730, 97 * 101, 2.5, NaN, Infinity, '7', null]) {
    assert.equal(isPrime(n), false, String(n));
  }
});


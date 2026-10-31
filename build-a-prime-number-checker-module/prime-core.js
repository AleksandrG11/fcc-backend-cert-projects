/* One shared implementation for Node.js and the browser; no dependencies. */
(function (root) {
  'use strict';
  function isPrime(n) {
    if (typeof n !== 'number' || !Number.isSafeInteger(n) || n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let divisor = 3; divisor <= Math.sqrt(n); divisor += 2) {
      if (n % divisor === 0) return false;
    }
    return true;
  }
  if (typeof module === 'object' && module.exports) {
    module.exports = { isPrime };
  } else {
    root.PrimeExplorer = Object.freeze({ isPrime });
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

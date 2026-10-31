'use strict';
// Official freeCodeCamp certification project requires isPrime to be
// declared in index.js and exported as a named CommonJS property.
// Delegate the actual algorithm to the shared, tested Node/browser core.
const { isPrime: checkPrime } = require('./prime-core.js');
function isPrime(number) {
  return checkPrime(number);
}
module.exports = { isPrime };

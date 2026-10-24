const isPrime = (n) => {
  if (typeof n !== 'number' || !Number.isSafeInteger(n) || n < 2) {
    return false;
  }

  if (n === 2) {
    return true;
  }

  if (n % 2 === 0) {
    return false;
  }

  for (let divisor = 3; divisor <= Math.sqrt(n); divisor += 2) {
    if (n % divisor === 0) {
      return false;
    }
  }

  return true;
};

module.exports = { isPrime };


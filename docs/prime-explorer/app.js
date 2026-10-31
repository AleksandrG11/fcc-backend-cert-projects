(() => {
  'use strict';
  const form = document.querySelector('#prime-form');
  const input = document.querySelector('#candidate');
  const output = document.querySelector('#result');
  const MAX = 1_000_000_000_000;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const raw = input.value.trim();
    const value = Number(raw);
    if (!raw || !/^\d+$/.test(raw) || !Number.isSafeInteger(value) || value > MAX) {
      output.textContent = 'Enter a whole number between 0 and 1,000,000,000,000.';
      output.dataset.kind = 'error';
      return;
    }
    const prime = globalThis.PrimeExplorer.isPrime(value);
    output.textContent = prime ? value.toLocaleString('en-US') + ' is prime.' : value.toLocaleString('en-US') + ' is not prime.';
    output.dataset.kind = prime ? 'prime' : 'composite';
  });
})();

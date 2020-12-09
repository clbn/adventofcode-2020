const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/).map(i => +i);
const preambleSize = 25;

// --- Part One ---

const checkEntry = (i) => {
  const currentEntry = entries[i];
  const preamble = new Set(entries.slice(i - preambleSize, i));

  for (let j = 0; j < preambleSize - 1; j++) {
    const firstAddend = entries[i - preambleSize + j];
    const secondAddend = currentEntry - firstAddend;
    if (preamble.has(secondAddend)) {
      return true;
    }
  }

  return false;
}

let invalidNumber;
for (let i = preambleSize; i < entries.length; i++) {
  if (!checkEntry(i)) {
    invalidNumber = entries[i];
  }
}

// --- Part Two ---

let start = 0;
while (entries[start] < invalidNumber) {
  let i = start;
  let sum = 0;
  const contiguous = [];

  while (sum < invalidNumber) {
    sum += entries[i];
    contiguous.push(entries[i]);
    i++;
  }

  if (sum === invalidNumber) {
    contiguous.sort((a, b) => a - b);
    const min = contiguous[0];
    const max = contiguous[contiguous.length - 1];
    console.log(min + max);
    return;
  }

  start++;
}

console.log('No weakness found');

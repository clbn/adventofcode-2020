const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/).map(i => +i);
const preambleSize = 25;

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

for (let i = preambleSize; i < entries.length; i++) {
  if (!checkEntry(i)) {
    console.log(entries[i]);
    return;
  }
}

console.log('No invalid number');

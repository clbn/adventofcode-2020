const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

const checkEntry = (entry) => {
  const [, min, max, letter, password] = entry.match(/^(\d+)-(\d+) (\w): (\w+)$/);
  const occurrences = password.split(letter).length - 1;
  return occurrences >= min && occurrences <= max;
};

const count = entries.filter(checkEntry).length;
console.log(count);

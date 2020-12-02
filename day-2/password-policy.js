const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

const checkEntry = (entry) => {
  const [, first, second, letter, password] = entry.match(/^(\d+)-(\d+) (\w): (\w+)$/);
  const atFirst = password[first-1] === letter;
  const atSecond = password[second-1] === letter;
  return (atFirst !== atSecond); // XOR
};

const count = entries.filter(checkEntry).length;
console.log(count);

const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const ids = data
  .replace(/[FL]/g, '0')
  .replace(/[BR]/g, '1')
  .trim()
  .split(/\r?\n/)
  .map(id => parseInt(id, 2));

ids.sort((a, b) => a - b);

const firstWithoutNeighbor = ids.find((v, i, a) => a[i+1] !== a[i]+1);

console.log(firstWithoutNeighbor + 1);

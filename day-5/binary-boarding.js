const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const ids = data
  .replace(/[FL]/g, '0')
  .replace(/[BR]/g, '1')
  .trim()
  .split(/\r?\n/)
  .map(id => parseInt(id, 2));

ids.sort((a, b) => b - a);

console.log(ids[0]);

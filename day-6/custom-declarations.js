const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const groups = data.trim().split(/\r?\n\r?\n/);

let sum = 0;
groups.forEach(group => {
  const letters = group.replace(/[\r\n]/g, '').split('');
  const unique = new Set(letters);
  sum += unique.size;
});

console.log(sum);

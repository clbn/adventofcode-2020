const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const groups = data.trim().split(/\r?\n\r?\n/);

let sum = 0;
groups.forEach(group => {
  const members = group.split(/\r?\n/).map(letters => letters.split(''));
  const intersection = members.reduce((inter, letters) => letters.filter(l => inter.includes(l)), members[0]);
  sum += intersection.length;
});

console.log(sum);

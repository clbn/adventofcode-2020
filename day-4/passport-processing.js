const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n\r?\n/);

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const checkEntry = (entry) => {
  const presentFields = entry.match(/\b(\w+):/g);
  return requiredFields.every(f => presentFields.includes(f+':'));
};

const count = entries.filter(checkEntry).length;
console.log(count);

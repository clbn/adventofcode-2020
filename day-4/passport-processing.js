const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n\r?\n/);

const rules = [
  ['byr', /^(19[2-9][0-9]|200[0-2])$/],
  ['iyr', /^20(1[0-9]|20)$/],
  ['eyr', /^20(2[0-9]|30)$/],
  ['hgt', /^(1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in)$/],
  ['hcl', /^#[\da-f]{6}$/],
  ['ecl', /^(amb|blu|brn|gry|grn|hzl|oth)$/],
  ['pid', /^\d{9}$/],
];

const checkEntry = (entry) => {
  const passport = [...entry.matchAll(/\b(\w+):([^\s]+)/g)] // -> array of arrays of strings
    .map(m => ({[m[1]]: m[2]})) // -> array of objects with one field
    .reduce((acc, obj) => ({...acc, ...obj}), {}); // -> object with all fields

  return rules.every(([field, rule]) => passport[field]?.match(rule));
};

const count = entries.filter(checkEntry).length;
console.log(count);

const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/).map(i => +i);
const set = new Set(entries);

for (let i = 0; i < entries.length - 1; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    const thirdOne = 2020 - entries[i] - entries[j];
    if (set.has(thirdOne)) {
      console.log(entries[i] * entries[j] * thirdOne);
      return;
    }
  }
}

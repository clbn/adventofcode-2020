const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/).map(i => +i);

for (let i = 0; i < entries.length - 1; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    if (entries[i] + entries[j] === 2020) {
      console.log(entries[i] * entries[j]);
    }
  }
}

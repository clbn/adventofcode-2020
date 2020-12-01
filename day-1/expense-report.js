const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/).map(i => +i);

for (let i = 0; i < entries.length - 2; i++) {
  for (let j = i + 1; j < entries.length - 1; j++) {
    for (let k = j + 1; k < entries.length; k++) {
      if (entries[i] + entries[j] + entries[k] === 2020) {
        console.log(entries[i] * entries[j] * entries[k]);
      }
    }
  }
}

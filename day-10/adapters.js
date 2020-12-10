const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const adapters = data.trim().split(/\r?\n/).map(i => +i);

adapters.sort((a, b) => a - b);
adapters.unshift(0); // + power outlet at the start
adapters.push(adapters[adapters.length-1] + 3); // + target device at the end

let gaps = [0, 0, 0, 0];
for (let i = 0; i < adapters.length - 1; i++) {
  const current = adapters[i];
  const next = adapters[i+1];
  gaps[next - current]++;
}

console.log(gaps[1] * gaps[3]);

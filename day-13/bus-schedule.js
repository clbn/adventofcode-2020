const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const rows = data.trim().split(/\r?\n/);

// --- Part One ---

let timestamp = rows[0];
let buses = rows[1].split(',').map(i => +i).filter(Boolean);
const waitingTimes = buses.map(b => b - timestamp % b);
const earliest = waitingTimes.indexOf(Math.min(...waitingTimes));

console.log(buses[earliest] * waitingTimes[earliest]);

// --- Part Two ---

timestamp = 1;
buses = rows[1].split(',').map(i => +i);
let step = 1;

for (let i=0; i < buses.length; i++) {
  for (; buses[i]; timestamp += step) {
    if ((timestamp + i) % buses[i] === 0) {
      step *= buses[i];
      break;
    }
  }
}

console.log(timestamp);

const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const rows = data.trim().split(/\r?\n/);

const timestamp = rows[0];
const buses = rows[1].split(',').map(i => +i).filter(Boolean);

const waitingTimes = buses.map(b => b - timestamp % b);
const earliest = waitingTimes.indexOf(Math.min(...waitingTimes));

console.log(buses[earliest] * waitingTimes[earliest]);

const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

// --- Part One ---

let x = 0;
let y = 0;
let angle = 90;

entries.forEach(instruction => {
  const action = instruction[0];
  const value = +instruction.slice(1);
  switch (action) {
    case 'N': y -= value; break;
    case 'E': x += value; break;
    case 'S': y += value; break;
    case 'W': x -= value; break;
    case 'L': angle -= value; break;
    case 'R': angle += value; break;
    case 'F':
      switch (angle % 360) {
        case 0: y -= value; break;
        case 90: x += value; break;
        case 180: y += value; break;
        case 270: x -= value; break;
      }
  }
});

console.log(Math.abs(x) + Math.abs(y));

// --- Part Two ---

x = 0;
y = 0;
let wx = 10;
let wy = -1;

entries.forEach(instruction => {
  const action = instruction[0];
  const value = +instruction.slice(1);
  switch (action) {
    case 'N': wy -= value; break;
    case 'E': wx += value; break;
    case 'S': wy += value; break;
    case 'W': wx -= value; break;
    case 'L':
      switch (value % 360) {
        case 90:  [wx, wy] = [ wy, -wx]; break;
        case 180: [wx, wy] = [-wx, -wy]; break;
        case 270: [wx, wy] = [-wy,  wx]; break;
      }
      break;
    case 'R':
      switch (value % 360) {
        case 90:  [wx, wy] = [-wy,  wx]; break;
        case 180: [wx, wy] = [-wx, -wy]; break;
        case 270: [wx, wy] = [ wy, -wx]; break;
      }
      break;
    case 'F':
      x += wx * value;
      y += wy * value;
  }
});

console.log(Math.abs(x) + Math.abs(y));

const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

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

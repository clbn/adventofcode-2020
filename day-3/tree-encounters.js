const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const map = data.trim().split(/\r?\n/);

const countSlope = (stepsRight, stepsDown) => {
  let count = 0;
  for (let x = stepsRight, y = stepsDown; y < map.length; y += stepsDown, x += stepsRight) {
    const xNorm = x % map[y].length;
    if (map[y][xNorm] === '#') {
      count++;
    }
  }
  return count;
}

const multiplied = countSlope(1, 1) * countSlope(3, 1) * countSlope(5, 1) * countSlope(7, 1) * countSlope(1, 2);

console.log(multiplied);

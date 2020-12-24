const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

// --- Part One ---

let floor = {};
entries.forEach(entry => {
  let y = 0;
  let x = 0;

  for (let i = 0; i < entry.length; i++) {
    const e1 = entry[i];
    const e2 = e1 + entry[i+1];
    switch (e2) {
      case 'nw': i++; y--; break;
      case 'ne': i++; y--; x++; break;
      case 'sw': i++; y++; x--; break;
      case 'se': i++; y++; break;
      default: switch (e1) {
        case 'w': x--; break;
        case 'e': x++; break;
      }
    }
  }

  const coord = `${x},${y}`;
  floor[coord] = !floor[coord];
});

let blackTiles = Object.values(floor).filter(Boolean).length;
console.log(blackTiles);

// --- Part Two ---

const blackNeighbors = (floor, x, y) => {
  let occ = 0;
  for (let a = -1; a <= 1; a++)
    for (let b = -1; b <= 1; b++)
      if (a !== b)
        if (floor[`${x+a},${y+b}`])
          occ++;
  return occ;
};

const nextTileState = (floor, x, y) => {
  const bn = blackNeighbors(floor, x, y);
  const coord = `${x},${y}`;
  if (floor[coord] && (bn === 0 || bn > 2)) {
    return false;
  } else if (!floor[coord] && bn === 2) {
    return true;
  }
  return floor[coord];
};

const nextFloorState = (floor) => {
  let minx = 0, miny = 0, maxx = 0, maxy = 0;
  Object.keys(floor).forEach(coord => {
    const [x, y] = coord.split(',');
    if (+x < minx) minx = +x;
    if (+y < miny) miny = +y;
    if (+x > maxx) maxx = +x;
    if (+y > maxy) maxy = +y;
  });

  const newFloor = {};
  for (let y = miny - 1; y <= maxy + 1; y++) {
    for (let x = minx - 1; x <= maxx + 1; x++) {
      if (nextTileState(floor, x, y)) {
        newFloor[`${x},${y}`] = true;
      }
    }
  }
  return newFloor;
}

for (let i = 1; i <= 100; i++) {
  floor = nextFloorState(floor);
}

blackTiles = Object.values(floor).filter(Boolean).length;
console.log(blackTiles);

const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
let mapBefore = data.trim().split(/\r?\n/).map(row => row.split(''));

const cloneMap = (map) => JSON.parse(JSON.stringify(map));

const occupiedAround = (map, y, x) => {
  let occ = 0;
  for (let a = -1; a <= 1; a++) {
    for (let b = -1; b <= 1; b++) {
      if (!(a === 0 && b === 0)) {
        if (map[y+a] && map[y+a][x+b] === '#') {
          occ++;
        }
      }
    }
  }
  return occ;
};

const nextState = (map, y, x) => {
  if (map[y][x] === 'L' && occupiedAround(map, y, x) === 0) {
    return '#';
  } else if (map[y][x] === '#' && occupiedAround(map, y, x) >= 4) {
    return 'L';
  }
  return map[y][x];
};

let occupiedSeats;
let balanced;
let mapAfter = [];
do {
  occupiedSeats = 0;
  balanced = true;
  for (let y = 0; y < mapBefore.length; y++) {
    mapAfter[y] = [];
    for (let x = 0; x < mapBefore[y].length; x++) {
      mapAfter[y][x] = nextState(mapBefore, y, x);
      if (mapAfter[y][x] !== mapBefore[y][x]) {
        balanced = false;
      }
      if (mapAfter[y][x] === '#') {
        occupiedSeats++;
      }
    }
  }
  mapBefore = cloneMap(mapAfter);
} while (!balanced);

console.log(occupiedSeats);

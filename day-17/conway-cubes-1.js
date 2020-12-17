const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
let pocket = [
  data.trim().split(/\r?\n/).map(row =>
    row.split('').map(cell => cell === '#')
  )
];

const expandMap = (map) => {
  const sx = map[0][0].length;
  const sy = map[0].length;

  const ex = false;
  const ey = Array(sx + 2).fill(ex);
  const ez = Array(sy + 2).fill(ey);

  return [ez, ...map.map(z =>
    [ey, ...z.map(y =>
      [ex, ...y, ex]
    ), ey]
  ), ez];
};

const occupiedAround = (map, x, y, z) => {
  let occ = 0;
  for (let a = -1; a <= 1; a++) {
    for (let b = -1; b <= 1; b++) {
      for (let c = -1; c <= 1; c++) {
        if (!(a === 0 && b === 0 && c === 0)) {
          if (map[z+c] && map[z+c][y+b] && map[z+c][y+b][x+a]) {
            occ++;
          }
        }
      }
    }
  }
  return occ;
};

const nextState = (map, x, y, z) => {
  const occ = occupiedAround(map, x, y, z);
  if (map[z][y][x] && occ !== 2 && occ !== 3) {
    return false;
  } else if (!map[z][y][x] && occ === 3) {
    return true;
  }
  return map[z][y][x];
};

let activeCubes;
for (let i = 0; i < 6; i++) {
  activeCubes = 0;
  pocket = expandMap(pocket);
  pocket = pocket.map((z, iz) =>
    z.map((y, iy) =>
      y.map((x, ix) => {
        const state = nextState(pocket, ix, iy, iz);
        if (state) {
          activeCubes++;
        }
        return state;
      })
    )
  );
}

console.log(activeCubes);

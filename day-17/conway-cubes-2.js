const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
let pocket = [[
  data.trim().split(/\r?\n/).map(row =>
    row.split('').map(cell => cell === '#')
  )
]];

const expandMap = (map) => {
  const sx = map[0][0][0].length;
  const sy = map[0][0].length;
  const sz = map[0].length;

  const ex = false;
  const ey = Array(sx + 2).fill(ex);
  const ez = Array(sy + 2).fill(ey);
  const ew = Array(sz + 2).fill(ez);

  return [ew, ...map.map(w =>
    [ez, ...w.map(z =>
      [ey, ...z.map(y =>
        [ex, ...y, ex]
      ), ey]
    ), ez]
  ), ew];
};

const occupiedAround = (map, x, y, z, w) => {
  let occ = 0;
  for (let a = -1; a <= 1; a++)
    for (let b = -1; b <= 1; b++)
      for (let c = -1; c <= 1; c++)
        for (let d = -1; d <= 1; d++)
          if (a || b || c || d)
            if (map[w+d]?.[z+c]?.[y+b]?.[x+a])
              occ++;
  return occ;
};

const nextState = (map, x, y, z, w) => {
  const occ = occupiedAround(map, x, y, z, w);
  if (map[w][z][y][x] && occ !== 2 && occ !== 3) {
    return false;
  } else if (!map[w][z][y][x] && occ === 3) {
    return true;
  }
  return map[w][z][y][x];
};

let activeCubes;
for (let i = 0; i < 6; i++) {
  activeCubes = 0;
  pocket = expandMap(pocket);
  pocket = pocket.map((w, iw) =>
    w.map((z, iz) =>
      z.map((y, iy) =>
        y.map((x, ix) => {
          const state = nextState(pocket, ix, iy, iz, iw);
          if (state) {
            activeCubes++;
          }
          return state;
        })
      )
    )
  );
}

console.log(activeCubes);

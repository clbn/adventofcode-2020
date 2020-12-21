const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });

// --- Part One ---

const tiles = data.trim().split(/\r?\n\r?\n/)
  .map(tile => {
    const id = +tile.slice(5, 9);
    const cells = tile.split(/\r?\n/).slice(1);
    const middle = cells.slice(1, 9).map(row => row.slice(1, 9).split(''));

    const edges = [
      cells[0],                                 // 0 - Top
      cells[0].split('').reverse().join(''),    //     Top flipped
      cells[9],                                 // 2 - Bottom
      cells[9].split('').reverse().join(''),    //     Bottom flipped
      cells.map(c => c[0]).join(''),            // 4 - Left
      cells.map(c => c[0]).reverse().join(''),  //     Left flipped
      cells.map(c => c[9]).join(''),            // 6 - Right
      cells.map(c => c[9]).reverse().join(''),  //     Right flipped
    ].map(edge =>
      parseInt(edge.replace(/\./g, '0').replace(/#/g, '1'), 2)
    );

    return { id, middle, edges, sharedCount: 0 };
  });

let cornerTiles = [];
let edgeTiles = [];
tiles.forEach(tile1 => {
  tiles.forEach(tile2 => {
    if (tile1.id !== tile2.id) {
      tile1.sharedCount += tile1.edges.filter(e => tile2.edges.includes(e)).length;
    }
  });
  if (tile1.sharedCount === 4) {
    cornerTiles.push(tile1.id);
  }
  if (tile1.sharedCount === 6) {
    edgeTiles.push(tile1.id);
  }
});

console.log('Corner tiles:', cornerTiles);
const product = cornerTiles[0] * cornerTiles[1] * cornerTiles[2] * cornerTiles[3];
console.log(product);

// --- Part Two ---

const tilesById = [];
tiles.forEach(tile => {
  tilesById[tile.id] = tile;
});

// 1. Tiling

const tilesInOrder = [[]];
const usedTiles = new Set();
const size = tiles.length ** 0.5;

// 1.1. Tile the top row

tilesInOrder[0][0] = cornerTiles[0];
usedTiles.add(cornerTiles[0]);
for (let y = 0, x = 1; x < size; x++) {
  const prevTile = tilesById[ tilesInOrder[y][x-1] ];

  const currentTile = tiles.filter(tile => (
    (edgeTiles.includes(tile.id) || cornerTiles.includes(tile.id)) &&
    !usedTiles.has(tile.id) &&
    tile.edges.filter(e => prevTile.edges.includes(e)).length > 0
  ))[0];

  tilesInOrder[y][x] = currentTile.id;
  usedTiles.add(currentTile.id);
}

// console.log('tilesInOrder', tilesInOrder);

// 1.2. Tile other rows

for (let y = 1; y < size; y++) {
  tilesInOrder[y] = [];

  for (let x = 0; x < size; x++) {
    const upperTile = tilesById[ tilesInOrder[y-1][x] ];

    const currentTile = tiles.filter(tile => (
      !usedTiles.has(tile.id) &&
      tile.edges.filter(e => upperTile.edges.includes(e)).length > 0
    ))[0];

    tilesInOrder[y][x] = currentTile.id;
    usedTiles.add(currentTile.id);
  }
}

// console.log('tilesInOrder', tilesInOrder);

// 2. Place tiles in correct orientation, according to the calculated order

const theMap = [];

const flipBLtoTR = (m) => m[0].map((c, i) => m.map(row => row[i]));
const flipBRtoTL = (m) => flipVertical(rotateCW(m));
const rotateCW = (m) => flipHorizontal(flipBLtoTR(m));
const flipHorizontal = (m) => m.map(r => [...r].reverse());
const flipVertical = (m) => [...m].reverse();

const orientate = (cells, right, down) => {
  if (right === 0 && down === 6) return rotateCW(cells);
  if (right === 4 && down === 0) return rotateCW(rotateCW(cells));
  if (right === 2 && down === 4) return rotateCW(rotateCW(rotateCW(cells)));
  if (right === 4 && down === 2) return flipHorizontal(cells);
  if (right === 6 && down === 0) return flipVertical(cells);
  if (right === 0 && down === 4) return flipBRtoTL(cells);
  if (right === 2 && down === 6) return flipBLtoTR(cells);
  if (right === 6 && down === 2) return cells;
};

for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const currentTile = tilesById[ tilesInOrder[y][x] ];

    // 2.1. Find correct orientation

    let nextRight;
    if (x === size-1) {
      // For rightmost tiles, match left neighbor instead of right
      nextRight = tilesById[ tilesInOrder[y][x-1] ];
    } else {
      nextRight = tilesById[ tilesInOrder[y][x+1] ];
    }

    let nextDown;
    if (y === size-1) {
      // For lowest tiles, match upper neighbor instead of lower
      nextDown = tilesById[ tilesInOrder[y-1][x] ];
    } else {
      nextDown = tilesById[ tilesInOrder[y+1][x] ];
    }

    // Edge intersection between current and right/down neighbor
    const eiRight = currentTile.edges.filter(t => nextRight.edges.includes(t));
    const eiDown = currentTile.edges.filter(t => nextDown.edges.includes(t));

    // Positions of that edge intersection, among the current tile's edges
    let eiPosRight = currentTile.edges.map((e, pos) => eiRight.includes(e) ? pos : '').filter(String)[0];
    let eiPosDown = currentTile.edges.map((e, pos) => eiDown.includes(e) ? pos : '').filter(String)[0];

    // For rightmost/lowest tiles, when matching left/upper neighbor instead of
    // right/lower, we need to flip the edge relative position (0 <-> 2, 4 <-> 6)
    const normalized = [2, null, 0, null, 6, null, 4];
    if (x === size-1) {
      // Put left instead of right
      eiPosRight = normalized[eiPosRight];
    }
    if (y === size-1) {
      // Put upper instead of lower
      eiPosDown = normalized[eiPosDown];
    }

    const newMiddle = orientate(currentTile.middle, eiPosRight, eiPosDown);

    // 2.2. Place into The Map

    for (let yy = 0; yy < 8; yy++) {
      if (!theMap[y * 8 + yy]) {
        theMap[y * 8 + yy] = [];
      }
      for (let xx = 0; xx < 8; xx++) {
        theMap[y * 8 + yy][x * 8 + xx] = newMiddle[yy][xx];
      }
    }
  }
}

// console.log(theMap.map(row => row.join('')).join('\n'));

// 3. Finally, find sea monsters

const monster = [
  '                  # ',
  '#    ##    ##    ###',
  ' #  #  #  #  #  #   ',
];

function findMonsters(map) {
  let monsterCount = 0;

  for (let y = 0; y <= map.length - monster.length; y++) {
    for (let x = 0; x <= map[0].length - monster[0].length; x++) {
      let foundOne = true;

      inner:
      for (let yy = 0; yy < monster.length; yy++) {
        for (let xx = 0; xx < monster[0].length; xx++) {
          if (monster[yy][xx] !== '#') continue;
          if (map[y + yy][x + xx] !== '#') {
            foundOne = false;
            break inner;
          }
        }
      }

      if (foundOne) {
        monsterCount++;
        for (let yy = 0; yy < monster.length; yy++) {
          for (let xx = 0; xx < monster[0].length; xx++) {
            if (monster[yy][xx] !== '#') continue;
            map[y + yy][x + xx] = 'O';
          }
        }
      }
    }
  }

  if (monsterCount > 0) {
    console.log('Found', monsterCount, 'monsters');
    console.log(map.map(row => row.join('')).join('').match(/#/g).length);
  }
}

findMonsters(theMap);
findMonsters(rotateCW(theMap));
findMonsters(rotateCW(rotateCW(theMap)));
findMonsters(rotateCW(rotateCW(rotateCW(theMap))));
findMonsters(flipHorizontal(theMap));
findMonsters(flipHorizontal(rotateCW(theMap)));
findMonsters(flipHorizontal(rotateCW(rotateCW(theMap))));
findMonsters(flipHorizontal(rotateCW(rotateCW(rotateCW(theMap)))));

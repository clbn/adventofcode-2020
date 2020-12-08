const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

const instructions = entries.map(e => {
  const [, operation, argument] = e.match(/^(\w+) ([+-]\d+)$/);
  return { operation, argument: +argument };
})

const visited = new Set();
let accumulator = 0;
let position = 0;

while (!visited.has(position)) {
  visited.add(position);
  const { operation, argument } = instructions[position];
  switch (operation) {
    case 'acc': accumulator += argument; position++; break;
    case 'jmp': position += argument; break;
    case 'nop': position++; break;
  }
}

console.log(accumulator);

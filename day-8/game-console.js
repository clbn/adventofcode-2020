const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

const instructions = entries.map(e => {
  const [, operation, argument] = e.match(/^(\w+) ([+-]\d+)$/);
  return { operation, argument: +argument };
})

const run = (instructions) => {
  const visited = new Set();
  let accumulator = 0;
  let position = 0;

  while (!visited.has(position)) {
    if (position === instructions.length) {
      return { accumulator, corrupted: false };
    }

    visited.add(position);
    const { operation, argument } = instructions[position];
    switch (operation) {
      case 'acc': accumulator += argument; position++; break;
      case 'jmp': position += argument; break;
      case 'nop': position++; break;
    }
  }

  return { accumulator, corrupted: true };
}

for (let i = 0; i < instructions.length; i++) {
  const { operation, argument } = instructions[i];
  if (operation !== 'acc') {
    const repaired = [...instructions];
    repaired[i] = { argument, operation: operation === 'nop' ? 'jmp' : 'nop' };

    const { accumulator, corrupted } = run(repaired);
    if (!corrupted) {
      console.log(accumulator);
      return;
    }
  }
}

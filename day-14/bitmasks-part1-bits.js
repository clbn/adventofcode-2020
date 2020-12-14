const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

let mask = '';
let mem = [];

const bit = (a, op, b) => {
  const w = 2147483648; // 2^31
  const a_hi = ~~(a / w);
  const b_hi = ~~(b / w);
  const a_lo = a % w;
  const b_lo = b % w;
  switch (op) {
    case '&': return ((a_hi & b_hi) * w + (a_lo & b_lo));
    case '|': return ((a_hi | b_hi) * w + (a_lo | b_lo));
  }
};

const applyMask = (number, mask) => {
  const ones = parseInt(mask.replace(/X/g, '0'), 2);
  const zeros = parseInt(mask.replace(/X/g, '1'), 2);
  // return number | ones & zeros;
  return bit(bit(number, '|', ones), '&', zeros);
};

entries.forEach(e => {
  const [, operation, , address, value] = e.match(/^(\w+)(\[(\d+)\])? = (\S+)$/);

  if (operation === 'mask') {
    mask = value;
  } else {
    mem[+address] = applyMask(+value, mask);
  }
});

const sum = mem.reduce((a, b) => a + b, 0);
console.log(sum);

const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

let mask = '';
let mem = [];

const applyMask = (number, mask) => {
  const bits = number
    .toString(2)
    .padStart(36, '0')
    .split('')
    .map((bit, i) => mask[i] === 'X' ? bit : mask[i])
    .join('');
  return parseInt(bits, 2);
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

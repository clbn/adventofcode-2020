const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

let mask = '';
let mem = {};

const applyMask = (number, mask) => number
  .toString(2)
  .padStart(36, '0')
  .split('')
  .map((bit, i) => mask[i] === '0' ? bit : mask[i])
  .join('');

const writeToFloatingAddress = (floatingAddress, value) => {
  const floatingRate = floatingAddress.split('X').length - 1;
  const combinations = Math.pow(2, floatingRate);
  for (let i = 0; i < combinations; i++) {
    const securedBits = i.toString(2).padStart(floatingRate, '0');
    let securedAddress = floatingAddress;
    for (let j = 0; j < securedBits.length; j++) {
      securedAddress = securedAddress.replace('X', securedBits[j]);
    }
    mem[securedAddress] = value;
  }
};

entries.forEach(e => {
  const [, operation, , address, value] = e.match(/^(\w+)(\[(\d+)\])? = (\S+)$/);

  if (operation === 'mask') {
    mask = value;
  } else {
    const floatingAddress = applyMask(+address, mask);
    writeToFloatingAddress(floatingAddress, +value);
  }
});

const sum = Object.values(mem).reduce((a, b) => a + b, 0);
console.log(sum);

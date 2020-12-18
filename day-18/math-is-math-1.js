const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
let expressions = data.trim().split(/\r?\n/);

const calc = (str) => {
  let m;

  while (m = str.match(/^(.*?)\(([^()]*)\)(.*)$/)) {
    const [, prefix, subclause, postfix] = m;
    str = prefix + calc(subclause) + postfix;
  }

  while (m = str.match(/^(.*?)(\d+) ([*+]) (\d+)(.*)$/)) {
    const [, prefix, d1, op, d2, postfix] = m;
    str = prefix + (op === '*' ? (+d1 * +d2) : (+d1 + +d2)) + postfix;
  }

  return +str;
};

const sum = expressions.map(calc).reduce((acc, val) => acc + val, 0);

console.log(sum);

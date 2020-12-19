const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const [rawRules, rawMessages] = data.trim().split(/\r?\n\r?\n/);

const rules = [];
rawRules.split(/\r?\n/).forEach(r => {
  const [, number, format] = r.match(/^(\d+): (.+)$/);
  rules[+number] = format;
});
rules[8] = '( 42 ) +';
rules[11] = '( 42 ( 42 ( 42 ( 42 31 ) ? 31 ) ? 31 ) ? 31 )';

const messages = rawMessages.split(/\r?\n/);

const parse = (n) => {
  n = +n;
  let hasPipe = false;

  const parsed = rules[n]
    .split(' ')
    .map(t => {
      if (t[0] === '"') {
        return t[1];
      }
      if (/\d/.test(t)) {
        return parse(t);
      }
      hasPipe = true;
      return t;
    })
    .join('');

  return hasPipe ? `(${parsed})` : parsed;
}

const theRule = parse(0);
const theRegex = new RegExp('^' + theRule + '$');
const validMessages = messages.filter(m => theRegex.test(m));
console.log(validMessages.length);

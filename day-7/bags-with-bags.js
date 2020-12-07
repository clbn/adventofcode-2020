const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

const rules = entries.map(entry => {
  const [, container, inside] = entry.match(/^(\w+ \w+) bags contain(.+)$/);
  const ingredients = [...inside.matchAll(/ ((\d+) (\w+ \w+)) bags?[,.]/g)].map(m => m[3]);
  return { container, ingredients };
});

let eligibleBags = [];
let bagsToCheck = ['shiny gold'];

while (bagsToCheck.length > 0) {
  bagsToCheck = rules
    .filter(entry => entry.ingredients.some(i => bagsToCheck.includes(i)))
    .map(entry => entry.container);
  eligibleBags = [...eligibleBags, ...bagsToCheck];
}

const unique = new Set(eligibleBags);

console.log(unique.size);

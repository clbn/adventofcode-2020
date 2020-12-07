const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
const entries = data.trim().split(/\r?\n/);

const rules = {}

entries.forEach(entry => {
  const [, container, inside] = entry.match(/^(\w+ \w+) bags contain(.+)$/);
  const ingredients = [...inside.matchAll(/ ((\d+) (\w+ \w+)) bags?[,.]/g)].map(m => ({ quantity: +m[2], color: m[3] }));
  rules[container] = ingredients;
});

const countIngredients = (container) => {
  const rule = rules[container];
  return rule.reduce((acc, ing) => acc + ing.quantity + ing.quantity * countIngredients(ing.color), 0);
};

const total = countIngredients('shiny gold');

console.log(total);

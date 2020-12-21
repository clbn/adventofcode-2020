const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const foods = data.trim().split(/\r?\n/).map(food => {
  const [, i, a] = food.match(/^([\w\s]+) \(contains ([^)]+)\)$/);
  const ingredients = i.split(' ');
  const allergens = a.split(', ');
  return { ingredients, allergens };
});

// --- Part One ---

const atoiCandidates = {};
foods.forEach(food => {
  food.allergens.forEach(allergen => {
    if (!atoiCandidates[allergen]) {
      atoiCandidates[allergen] = food.ingredients;
    } else {
      atoiCandidates[allergen] = atoiCandidates[allergen].filter(i => food.ingredients.includes(i));
    }
  });
});

const atoi = {};
while (Object.keys(atoi).length < Object.keys(atoiCandidates).length) {
  for (const [allergen, ingredients] of Object.entries(atoiCandidates)) {
    const stillAvailable = ingredients.filter(i => !Object.values(atoi).includes(i));
    if (stillAvailable.length === 1) {
      atoi[allergen] = stillAvailable[0];
      break;
    }
  }
}

const badIngredientAppearances = foods.reduce((acc, food) =>
  acc + food.ingredients.filter(i => !Object.values(atoi).includes(i)).length, 0);

console.log(badIngredientAppearances);

// --- Part Two ---

const badIngredients = Object.entries(atoi);
badIngredients.sort((a, b) => a[0].localeCompare(b[0]));

const canonicalList = badIngredients.map(item => item[1]).join(',');

console.log(canonicalList);

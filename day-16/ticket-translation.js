const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });
let [fieldRules, yourTicket, nearbyTickets] = data.trim().split(/\r?\n\r?\n/);

fieldRules = fieldRules.split(/\r?\n/).map(r => {
  const [, field, r1, r2, r3, r4] = r.match(/^([^:]+): (\d+)-(\d+) or (\d+)-(\d+)$/);
  return { field, r1, r2, r3, r4 };
});

yourTicket = yourTicket.split(/\r?\n/)[1].split(',').map(i => +i);

nearbyTickets = nearbyTickets.split(/\r?\n/).slice(1).map(t => t.split(',').map(i => +i));

// --- Part One ---

const isValidForOneRule = (v, { r1, r2, r3, r4 }) => (v >= r1 && v <= r2) || (v >= r3 && v <= r4);
const isValidForAnyRule = v => fieldRules.some(rule => isValidForOneRule(v, rule));
const isInvalidForAllRules = v => !isValidForAnyRule(v);

let sum = 0;
nearbyTickets.forEach(ticket => {
  sum += ticket.filter(isInvalidForAllRules).reduce((acc, f) => acc + f, 0);
});

console.log(sum);

// --- Part Two ---

const validTickets = nearbyTickets.filter(t => t.every(isValidForAnyRule));

const columns = [];
validTickets.forEach(ticket => {
  ticket.forEach((value, i) => {
    if (!columns[i]) {
      columns[i] = [];
    }
    columns[i].push(value);
  });
});

const possibleFields = columns.map((column, i) => {
  // List of lists of fields (for this one column)
  const fieldListList = column.map(c => fieldRules
    .filter(r => isValidForOneRule(c, r))
    .map(r => r.field)
  );

  // List of fields, flattened (for this one column)
  const fieldList = fieldListList.reduce(
    (inter, fields) => fields.filter(f => inter.includes(f)),
    fieldListList[0]
  );

  return {
    index: i,
    names: fieldList
  };
});

possibleFields.sort((a, b) => a.names.length - b.names.length);

const mappedTicket = [];
let availableFields = fieldRules.map(r => r.field);

possibleFields.forEach(({ index, names }) => {
  const possibleAndStillAvailable = names.filter(f => availableFields.includes(f));

  if (possibleAndStillAvailable.length > 1) {
    console.log('Is it even solvable?');
    return;
  }

  const theOne = possibleAndStillAvailable[0];
  mappedTicket.push({ name: theOne, value: yourTicket[index] });
  availableFields = availableFields.filter(f => f !== theOne);
})

const departureProduct = mappedTicket
  .filter(f => f.name.slice(0, 9) === 'departure')
  .reduce((acc, f) => acc * f.value, 1);

console.log(departureProduct);

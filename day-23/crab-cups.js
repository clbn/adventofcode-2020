const input = [6, 2, 4, 3, 9, 7, 1, 5, 8];
const moves = 100;

let cup;
let first;
let previous = null;
input.forEach(label => {
  cup = { label, next: null };
  if (!previous) {
    first = cup;
  } else {
    previous.next = cup;
  }
  previous = cup;
});
cup.next = first;
cup = cup.next;

for (let i = 0; i < moves; i++) {
  // Pick up three cups
  const currentLabel = cup.label;
  const nextThreeCups = cup.next;
  cup.next = cup.next.next.next.next;

  // Find destination cup
  const smallerCups = [];
  const biggerCups = [];
  for (let j = 0; j < input.length - 4; j++) {
    cup = cup.next;
    if (cup.label < currentLabel) {
      smallerCups.push(cup.label);
    } else {
      biggerCups.push(cup.label);
    }
  }
  const destinationLabel = smallerCups.length ? Math.max(...smallerCups) : Math.max(...biggerCups);

  // Put three cups down
  do { cup = cup.next } while (cup.label !== destinationLabel);
  nextThreeCups.next.next.next = cup.next;
  cup.next = nextThreeCups;

  // Move to a new current cup
  do { cup = cup.next } while (cup.label !== currentLabel);
  cup = cup.next;
}

let answer = '';
do { cup = cup.next } while (cup.label !== 1);
cup = cup.next;
do { answer += cup.label; cup = cup.next; } while (cup.label !== 1);

console.log(answer);

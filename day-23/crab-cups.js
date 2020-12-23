const input = [6, 2, 4, 3, 9, 7, 1, 5, 8];
const size = 10 ** 6;
const moves = 10 ** 7;

for (let i = 10; i <= size; i++) {
  input.push(i);
}

let cup;
let first;
let previous = null;
let cups = new Array(size);
input.forEach(label => {
  cup = { label, next: null };
  cups[label] = cup;
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
  let destinationLabel = currentLabel;
  const currentAndThree = [currentLabel, nextThreeCups.label, nextThreeCups.next.label, nextThreeCups.next.next.label];
  while (currentAndThree.includes(destinationLabel)) {
    destinationLabel--;
    if (destinationLabel < 1) {
      destinationLabel = size;
    }
  }

  // Put three cups down
  cup = cups[destinationLabel];
  nextThreeCups.next.next.next = cup.next;
  cup.next = nextThreeCups;

  // Move to a new current cup
  cup = cups[currentLabel].next;
}

const cup1 = cups[1].next;
const cup2 = cup1.next;

console.log(cup1.label * cup2.label)

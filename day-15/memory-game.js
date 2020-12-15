const input = [2, 0, 1, 9, 5, 19];
const turns = 30000000;

const numbers = new Array(turns);
input.forEach((n, i) => { numbers[n] = i+1; });

let last = input[input.length - 1];

for (let turn = input.length; turn < turns; turn++) {
  const used = numbers[last];
  numbers[last] = turn;
  last = used ? turn - used : 0;
}

console.log(last);

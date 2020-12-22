const fs = require('fs');
const data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const [initialDeck1, initialDeck2] = data.trim().split(/\r?\n\r?\n/).map(deck => deck.split(/\r?\n/).slice(1).map(i => +i));

// --- Part One ---

let deck1 = [...initialDeck1];
let deck2 = [...initialDeck2];

const playRound = () => {
  const card1 = deck1.shift();
  const card2 = deck2.shift();
  if (card1 > card2) {
    deck1.push(card1, card2);
  } else {
    deck2.push(card2, card1);
  }
}

while (deck1.length > 0 && deck2.length > 0) {
  playRound();
}

let winningDeck = deck1.length ? deck1 : deck2;
let score = winningDeck.reduce((acc, card, i, a) => acc + card * (a.length - i), 0);

console.log(score);

// --- Part Two ---

deck1 = [...initialDeck1];
deck2 = [...initialDeck2];

const playGame = (deck1, deck2) => {
  const roundCombinations = new Set();

  while (deck1.length > 0 && deck2.length > 0) {
    const hash = deck1.join(',') + '/' + deck2.join(',');
    if (roundCombinations.has(hash)) {
      return [1, deck1];
    }
    roundCombinations.add(hash);

    const card1 = deck1.shift();
    const card2 = deck2.shift();

    let roundWinner;
    if (card1 <= deck1.length && card2 <= deck2.length) {
      [roundWinner] = playGame(deck1.slice(0, card1), deck2.slice(0, card2));
    } else {
      roundWinner = (card1 > card2) ? 1 : 2;
    }

    if (roundWinner === 1) {
      deck1.push(card1, card2);
    } else {
      deck2.push(card2, card1);
    }
  }

  const winner = deck1.length ? 1 : 2;
  const winningDeck = deck1.length ? deck1 : deck2;

  return [winner, winningDeck];
}

[, winningDeck] = playGame(deck1, deck2);

score = winningDeck.reduce((acc, card, i, a) => acc + card * (a.length - i), 0);

console.log(score);

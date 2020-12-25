const cardPublicKey = 2084668;
const doorPublicKey = 3704642;
const divisor = 20201227;

const findLoopSize = (publicKey) => {
  const subject = 7;
  for (let v = 1, loopSize = 1;; loopSize++) {
    v = v * subject % divisor;
    if (v === publicKey) {
      return loopSize;
    }
  }
};

const getKey = (subject, loopSize) => {
  let v = 1;
  for (let i = 0; i < loopSize; i++) {
    v = v * subject % divisor;
  }
  return v;
};

const cardLoopSize = findLoopSize(cardPublicKey);
const key = getKey(doorPublicKey, cardLoopSize);
console.log(key);

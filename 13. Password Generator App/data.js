const ASCII_START = { uppercase: 65, lowercase: 97, number: 48, symbolFirst: 33, symbolSecond: 58, symbolThird: 91, symbolFourth: 123 };

// Function to create array
function createArray(length, startNumber) {
  return Array.from({ length: length }, (_, index) => String.fromCodePoint(startNumber + index));
}

const uppercaseAlphabetsArray = createArray(26, ASCII_START.uppercase);

const lowercaseAlphabetsArray = createArray(26, ASCII_START.lowercase);

const numbersArray = createArray(10, ASCII_START.number);

const symbolFirstArray = createArray(15, ASCII_START.symbolFirst);

const symbolSecondArray = createArray(7, ASCII_START.symbolSecond);

const symbolThirdArray = createArray(6, ASCII_START.symbolThird);

const symbolFourthArray = createArray(4, ASCII_START.symbolFourth);

const symbolsArray = [...symbolFirstArray, ...symbolSecondArray, ...symbolThirdArray, ...symbolFourthArray];

export { uppercaseAlphabetsArray, lowercaseAlphabetsArray, numbersArray, symbolsArray };

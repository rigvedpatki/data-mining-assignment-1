import ADLER32 = require('adler-32');

const shingling = (
  content: string,
  k: number
): {
  hashedShingles: number[];
  shinglesArray: string[];
  shingles: Set<string>;
} => {
  let shinglesArray = [];
  let hashedShingles = [];
  for (let i = 0; i < content.length - k + 1; i++) {
    shinglesArray.push(content.substr(i, k));
  }
  let shingles = new Set(shinglesArray);
  for (let shingle of shingles) {
    let hashedShingle = ADLER32.str(shingle);
    hashedShingles.push(hashedShingle);
  }
  return {
    shinglesArray,
    hashedShingles,
    shingles
  };
};

export default shingling;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maxShinglePossible = Math.pow(2, 32) - 1;
const nextPrime = 4294967311;
const numberOfHashes = 256;
// generates a random number between max and min included
const getRandomIntBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// pick random values of array for coeffecient a and b
const pickRandomCoeffs = (k, maxShingle) => {
    let randList = [];
    while (k > 0) {
        let randIndex = getRandomIntBetween(0, maxShingle);
        while (randList.indexOf(randIndex) != -1) {
            randIndex = getRandomIntBetween(0, maxShingle);
        }
        randList.push(randIndex);
        k = k - 1;
    }
    return randList;
};
// getting coefficients
const coeffA = pickRandomCoeffs(numberOfHashes, maxShinglePossible);
const coeffB = pickRandomCoeffs(numberOfHashes, maxShinglePossible);
const minhash = (shingles) => {
    const signatures = [];
    for (let i = 0; i < coeffA.length; i++) {
        let minHashCode = nextPrime + 1;
        for (let shingle of shingles) {
            let hashCode = (coeffA[i] * shingle + coeffB[i]) % nextPrime;
            if (hashCode < minHashCode) {
                minHashCode = hashCode;
            }
        }
        signatures.push(minHashCode);
    }
    return signatures;
};
exports.default = minhash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taW5oYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0MsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDO0FBQzdCLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztBQUUzQix5REFBeUQ7QUFDekQsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBRTtJQUN2RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMzRCxDQUFDLENBQUM7QUFFRixzREFBc0Q7QUFDdEQsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQVMsRUFBRSxVQUFrQixFQUFZLEVBQUU7SUFDbkUsSUFBSSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBRTVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNaLElBQUksU0FBUyxHQUFHLG1CQUFtQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDeEMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNoRDtRQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDWDtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUVGLHVCQUF1QjtBQUN2QixNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUNwRSxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUVwRSxNQUFNLE9BQU8sR0FBRyxDQUFDLFFBQWtCLEVBQVksRUFBRTtJQUMvQyxNQUFNLFVBQVUsR0FBYSxFQUFFLENBQUM7SUFFaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxXQUFXLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNoQyxLQUFLLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBRTtZQUM1QixJQUFJLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQzdELElBQUksUUFBUSxHQUFHLFdBQVcsRUFBRTtnQkFDMUIsV0FBVyxHQUFHLFFBQVEsQ0FBQzthQUN4QjtTQUNGO1FBRUQsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUM5QjtJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLGtCQUFlLE9BQU8sQ0FBQyJ9
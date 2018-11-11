"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const maxPossibleShingles = config_1.default.MINHASH_MAX_POSSIBLE_SHINGLES;
const nextPrime = config_1.default.MINHASH_NEXT_PRIME;
const numberOfHashes = config_1.default.MINHASH_NUMBER_OF_HASHES;
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
const coeffA = pickRandomCoeffs(numberOfHashes, maxPossibleShingles);
const coeffB = pickRandomCoeffs(numberOfHashes, maxPossibleShingles);
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
//# sourceMappingURL=minhash.js.map
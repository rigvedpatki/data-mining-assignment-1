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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taW5oYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBRTlCLE1BQU0sbUJBQW1CLEdBQUcsZ0JBQU0sQ0FBQyw2QkFBNkIsQ0FBQztBQUNqRSxNQUFNLFNBQVMsR0FBRyxnQkFBTSxDQUFDLGtCQUFrQixDQUFDO0FBQzVDLE1BQU0sY0FBYyxHQUFHLGdCQUFNLENBQUMsd0JBQXdCLENBQUM7QUFFdkQseURBQXlEO0FBQ3pELE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEVBQUU7SUFDdkQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDM0QsQ0FBQyxDQUFDO0FBRUYsc0RBQXNEO0FBQ3RELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFTLEVBQUUsVUFBa0IsRUFBWSxFQUFFO0lBQ25FLElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU1QixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDWixJQUFJLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbkQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFFRix1QkFBdUI7QUFDdkIsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDckUsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFFckUsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFrQixFQUFZLEVBQUU7SUFDL0MsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO0lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLElBQUksV0FBVyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDaEMsS0FBSyxJQUFJLE9BQU8sSUFBSSxRQUFRLEVBQUU7WUFDNUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUM3RCxJQUFJLFFBQVEsR0FBRyxXQUFXLEVBQUU7Z0JBQzFCLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFDeEI7U0FDRjtRQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDOUI7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFFRixrQkFBZSxPQUFPLENBQUMifQ==
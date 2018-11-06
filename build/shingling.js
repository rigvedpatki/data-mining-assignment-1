"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ADLER32 = require("adler-32");
const shingling = (content, k) => {
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
exports.default = shingling;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbmdsaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NoaW5nbGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUFxQztBQUVyQyxNQUFNLFNBQVMsR0FBRyxDQUNoQixPQUFlLEVBQ2YsQ0FBUyxFQUtULEVBQUU7SUFDRixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDdkIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0MsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEMsS0FBSyxJQUFJLE9BQU8sSUFBSSxRQUFRLEVBQUU7UUFDNUIsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3BDO0lBQ0QsT0FBTztRQUNMLGFBQWE7UUFDYixjQUFjO1FBQ2QsUUFBUTtLQUNULENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixrQkFBZSxTQUFTLENBQUMifQ==
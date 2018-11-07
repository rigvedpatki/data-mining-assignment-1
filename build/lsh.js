"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const bandSize = config_1.default.LSH_BAND_SIZE;
const getHashbands = (minhash) => {
    const hashBands = [];
    for (let i = 0; i < minhash.length / bandSize; i++) {
        let start = i * bandSize;
        let end = start + bandSize;
        let band = minhash.slice(start, end);
        hashBands.push(band.join('.'));
    }
    return hashBands;
};
exports.insertIntoLSHIndex = (fileName, minhash, index) => {
    let hashBands = getHashbands(minhash);
    for (let hashBand of hashBands) {
        for (let band of index.bands) {
            if (band.hash === hashBand) {
                band.fileNames.push(fileName);
            }
        }
        index.bands.push({ hash: hashBand, fileNames: [fileName] });
    }
    return index;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUE4QjtBQUU5QixNQUFNLFFBQVEsR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQztBQUV0QyxNQUFNLFlBQVksR0FBRyxDQUFDLE9BQWlCLEVBQVksRUFBRTtJQUNuRCxNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7SUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUMzQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNoQztJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQztBQUVXLFFBQUEsa0JBQWtCLEdBQUcsQ0FDaEMsUUFBZ0IsRUFDaEIsT0FBaUIsRUFDakIsS0FBWSxFQUNaLEVBQUU7SUFDRixJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsS0FBSyxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7UUFDOUIsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7UUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzdEO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUMifQ==
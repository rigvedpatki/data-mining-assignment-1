"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const bandSize = config_1.default.LSH_BAND_SIZE;
exports.getHashbands = (minhash) => {
    const hashBands = [];
    for (let i = 0; i < minhash.length / bandSize; i++) {
        let start = i * bandSize;
        let end = start + bandSize;
        let band = minhash.slice(start, end);
        hashBands.push(band.join('.'));
    }
    return hashBands;
};
exports.insertIntoLSHIndex = (documents) => {
    let index = {};
    for (let doc of documents) {
        for (let i = 0; i < doc.lshHashBands.length; i++) {
            let band = doc.lshHashBands[i];
            if (Array.isArray(index[band])) {
                index[band].push(doc.filePath.replace(/^.*[\\\/]/, ''));
            }
            else {
                index[band] = [doc.filePath.replace(/^.*[\\\/]/, '')];
            }
        }
    }
    return index;
};
//# sourceMappingURL=lsh.js.map
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const compare_sets_1 = __importDefault(require("./compare-sets"));
const compare_signatures_1 = __importDefault(require("./compare-signatures"));
const minhash_1 = __importDefault(require("./minhash"));
const lsh_1 = require("./lsh");
const shingling_1 = __importDefault(require("./shingling"));
const config_1 = __importDefault(require("./config"));
const k = config_1.default.K;
const DATA_PATH = path.resolve(__dirname, '../data');
const documents = [];
console.time('data-mining-assignment-1');
const dataFiles = fs
    .readdirSync(DATA_PATH)
    .filter(file => file.endsWith('.txt'));
for (let file of dataFiles) {
    let filePath = path.resolve(__dirname, '../data/', file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const { hashedShingles, shinglesArray, shingles } = shingling_1.default(content, k);
    let minHashSignatures = minhash_1.default(hashedShingles);
    let lshHashBands = lsh_1.getHashbands(minHashSignatures);
    documents.push({
        filePath,
        content,
        shinglesArray,
        shingles,
        hashedShingles,
        minHashSignatures,
        lshHashBands
    });
}
const index = lsh_1.insertIntoLSHIndex(documents);
fs.writeFileSync('output.txt', JSON.stringify(index, null, 2));
const results = [];
for (let [i, docA] of documents.entries()) {
    for (let [j, docB] of documents.entries()) {
        if (i >= j && i !== j) {
            let firstDocument = docA.filePath.replace(/^.*[\\\/]/, '');
            let secondDocument = docB.filePath.replace(/^.*[\\\/]/, '');
            let jaccardSimilarity = compare_sets_1.default(docA.hashedShingles, docB.hashedShingles);
            let minHashSimilarity = compare_signatures_1.default(docA.minHashSignatures, docB.minHashSignatures);
            results.push({
                firstDocument,
                secondDocument,
                jaccardSimilarity,
                minHashSimilarity
            });
        }
    }
}
const SimilarDocuments = results.filter(result => result.jaccardSimilarity >= config_1.default.JACCARD_SIMILARITY_THRESHOLD ||
    result.minHashSimilarity >= config_1.default.MINHASH_SIMILARITY_THRESHOLD);
let lshReshult = '';
for (let doc of documents) {
    let matches = {};
    let hashbands = doc.lshHashBands;
    for (var i = 0; i < hashbands.length; i++) {
        var band = hashbands[i];
        for (var j = 0; j < index[band].length; j++) {
            matches[index[band][j]] = true;
        }
    }
    lshReshult =
        `\nMatches for ${doc.filePath.replace(/^.*[\\\/]/, '')}: \n   ${JSON.stringify(matches, null, 2)}` + lshReshult;
}
let finalResults = '';
SimilarDocuments.forEach(doc => {
    finalResults =
        `\n Results : \n ${JSON.stringify(doc, null, 2)}` + finalResults;
});
fs.writeFileSync('output.txt', lshReshult + finalResults);
console.timeEnd('data-mining-assignment-1');
//# sourceMappingURL=index.js.map
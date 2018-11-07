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
    documents.push({
        filePath,
        content,
        shinglesArray,
        shingles,
        hashedShingles,
        minHashSignatures
    });
}
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
let index = {
    bands: []
};
for (let doc of documents) {
    let fileName = doc.filePath.replace(/^.*[\\\/]/, '');
    index = lsh_1.insertIntoLSHIndex(fileName, doc.minHashSignatures, index);
}
for (let [i, docA] of documents.entries()) {
    for (let [j, docB] of documents.entries()) {
        if (i >= j && i !== j) {
            let firstDocument = docA.filePath.replace(/^.*[\\\/]/, '');
            let secondDocument = docB.filePath.replace(/^.*[\\\/]/, '');
            let resultIndex = index.bands.filter(band => band.fileNames.includes(firstDocument) &&
                band.fileNames.includes(secondDocument));
            if (resultIndex.length > 0) {
                console.log(`LSH result for ${firstDocument} and ${secondDocument} are  ${resultIndex.length}`);
            }
        }
    }
}
// fs.writeFileSync('output.txt', JSON.stringify(lshResults, null, 2));
console.log(`Length of Results : ${results.length}`);
console.log(`Length of Results : ${SimilarDocuments.length}`);
SimilarDocuments.forEach(doc => {
    console.log(`Results : \n ${JSON.stringify(doc, null, 2)}`);
});
console.timeEnd('data-mining-assignment-1');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3QixrRUFBeUM7QUFDekMsOEVBQXFEO0FBQ3JELHdEQUFnQztBQUNoQywrQkFBMkM7QUFDM0MsNERBQW9DO0FBRXBDLHNEQUE4QjtBQUU5QixNQUFNLENBQUMsR0FBRyxnQkFBTSxDQUFDLENBQUMsQ0FBQztBQUVuQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVyRCxNQUFNLFNBQVMsR0FBZSxFQUFFLENBQUM7QUFFakMsT0FBTyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBRXpDLE1BQU0sU0FBUyxHQUFHLEVBQUU7S0FDakIsV0FBVyxDQUFDLFNBQVMsQ0FBQztLQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFFekMsS0FBSyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7SUFDMUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELE1BQU0sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxHQUFHLG1CQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTFFLElBQUksaUJBQWlCLEdBQUcsaUJBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVoRCxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2IsUUFBUTtRQUNSLE9BQU87UUFDUCxhQUFhO1FBQ2IsUUFBUTtRQUNSLGNBQWM7UUFDZCxpQkFBaUI7S0FDbEIsQ0FBQyxDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFFN0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUN6QyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRCxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxpQkFBaUIsR0FBRyxzQkFBVyxDQUNqQyxJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO1lBQ0YsSUFBSSxpQkFBaUIsR0FBRyw0QkFBaUIsQ0FDdkMsSUFBSSxDQUFDLGlCQUFpQixFQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQ3ZCLENBQUM7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNYLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxpQkFBaUI7Z0JBQ2pCLGlCQUFpQjthQUNsQixDQUFDLENBQUM7U0FDSjtLQUNGO0NBQ0Y7QUFFRCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQ3JDLE1BQU0sQ0FBQyxFQUFFLENBQ1AsTUFBTSxDQUFDLGlCQUFpQixJQUFJLGdCQUFNLENBQUMsNEJBQTRCO0lBQy9ELE1BQU0sQ0FBQyxpQkFBaUIsSUFBSSxnQkFBTSxDQUFDLDRCQUE0QixDQUNsRSxDQUFDO0FBRUYsSUFBSSxLQUFLLEdBQVU7SUFDakIsS0FBSyxFQUFFLEVBQUU7Q0FDVixDQUFDO0FBRUYsS0FBSyxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQUU7SUFDekIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELEtBQUssR0FBRyx3QkFBa0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3BFO0FBRUQsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUN6QyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRCxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ2xDLElBQUksQ0FBQyxFQUFFLENBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FDMUMsQ0FBQztZQUNGLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsa0JBQWtCLGFBQWEsUUFBUSxjQUFjLFNBQ25ELFdBQVcsQ0FBQyxNQUNkLEVBQUUsQ0FDSCxDQUFDO2FBQ0g7U0FDRjtLQUNGO0NBQ0Y7QUFFRCx1RUFBdUU7QUFFdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFFckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUU5RCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyJ9
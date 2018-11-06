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
const DATA_PATH = path.resolve(__dirname, '../data');
const k = 4;
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
console.log(`Length of Results : ${results.length}`);
const threshHold = 0.7;
const SimilarDocuments = results.filter(result => result.jaccardSimilarity >= threshHold ||
    result.minHashSimilarity >= threshHold);
let index = {
    bands: []
};
for (let doc of documents) {
    let fileName = doc.filePath.replace(/^.*[\\\/]/, '');
    index = lsh_1.insertIntoLSHIndex(fileName, doc.minHashSignatures, index);
}
let lshResults = [];
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
fs.writeFileSync('output.txt', JSON.stringify(lshResults, null, 2));
console.log(`Length of Results : ${SimilarDocuments.length}`);
SimilarDocuments.forEach(doc => {
    console.log(`Results : \n ${JSON.stringify(doc, null, 2)}`);
});
console.timeEnd('data-mining-assignment-1');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3QixrRUFBeUM7QUFFekMsOEVBQXFEO0FBQ3JELHdEQUFnQztBQUNoQywrQkFBd0Q7QUFDeEQsNERBQW9DO0FBV3BDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRXJELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVaLE1BQU0sU0FBUyxHQUFlLEVBQUUsQ0FBQztBQUVqQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFFekMsTUFBTSxTQUFTLEdBQUcsRUFBRTtLQUNqQixXQUFXLENBQUMsU0FBUyxDQUFDO0tBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUV6QyxLQUFLLElBQUksSUFBSSxJQUFJLFNBQVMsRUFBRTtJQUMxQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakQsTUFBTSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLEdBQUcsbUJBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFMUUsSUFBSSxpQkFBaUIsR0FBRyxpQkFBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRWhELFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDYixRQUFRO1FBQ1IsT0FBTztRQUNQLGFBQWE7UUFDYixRQUFRO1FBQ1IsY0FBYztRQUNkLGlCQUFpQjtLQUNsQixDQUFDLENBQUM7Q0FDSjtBQVNELE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUU3QixLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQ3pDLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1RCxJQUFJLGlCQUFpQixHQUFHLHNCQUFXLENBQ2pDLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxjQUFjLENBQ3BCLENBQUM7WUFDRixJQUFJLGlCQUFpQixHQUFHLDRCQUFpQixDQUN2QyxJQUFJLENBQUMsaUJBQWlCLEVBQ3RCLElBQUksQ0FBQyxpQkFBaUIsQ0FDdkIsQ0FBQztZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsYUFBYTtnQkFDYixjQUFjO2dCQUNkLGlCQUFpQjtnQkFDakIsaUJBQWlCO2FBQ2xCLENBQUMsQ0FBQztTQUNKO0tBQ0Y7Q0FDRjtBQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBRXJELE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQztBQUV2QixNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQ3JDLE1BQU0sQ0FBQyxFQUFFLENBQ1AsTUFBTSxDQUFDLGlCQUFpQixJQUFJLFVBQVU7SUFDdEMsTUFBTSxDQUFDLGlCQUFpQixJQUFJLFVBQVUsQ0FDekMsQ0FBQztBQUVGLElBQUksS0FBSyxHQUFVO0lBQ2pCLEtBQUssRUFBRSxFQUFFO0NBQ1YsQ0FBQztBQUVGLEtBQUssSUFBSSxHQUFHLElBQUksU0FBUyxFQUFFO0lBQ3pCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRCxLQUFLLEdBQUcsd0JBQWtCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNwRTtBQUVELElBQUksVUFBVSxHQUFXLEVBQUUsQ0FBQztBQUU1QixLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQ3pDLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1RCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDbEMsSUFBSSxDQUFDLEVBQUUsQ0FDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUMxQyxDQUFDO1lBQ0YsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxrQkFBa0IsYUFBYSxRQUFRLGNBQWMsU0FDbkQsV0FBVyxDQUFDLE1BQ2QsRUFBRSxDQUNILENBQUM7YUFDSDtTQUNGO0tBQ0Y7Q0FDRjtBQUVELEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXBFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFFOUQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUMifQ==
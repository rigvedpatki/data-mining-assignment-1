import * as fs from 'fs';
import * as path from 'path';
import compareSets from './compare-sets';
import compareSignatures from './compare-signatures';
import minhash from './minhash';
import { insertIntoLSHIndex, getHashbands } from './lsh';
import shingling from './shingling';
import { Document, Result } from './types';
import config from './config';

const k = config.K;

const DATA_PATH = path.resolve(__dirname, '../data');

const documents: Document[] = [];

console.time('data-mining-assignment-1');

const dataFiles = fs
  .readdirSync(DATA_PATH)
  .filter(file => file.endsWith('.txt'));

for (let file of dataFiles) {
  let filePath = path.resolve(__dirname, '../data/', file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const { hashedShingles, shinglesArray, shingles } = shingling(content, k);

  let minHashSignatures = minhash(hashedShingles);

  let lshHashBands = getHashbands(minHashSignatures);

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

const index = insertIntoLSHIndex(documents);

fs.writeFileSync('output.txt', JSON.stringify(index, null, 2));

const results: Result[] = [];

for (let [i, docA] of documents.entries()) {
  for (let [j, docB] of documents.entries()) {
    if (i >= j && i !== j) {
      let firstDocument = docA.filePath.replace(/^.*[\\\/]/, '');
      let secondDocument = docB.filePath.replace(/^.*[\\\/]/, '');
      let jaccardSimilarity = compareSets(
        docA.hashedShingles,
        docB.hashedShingles
      );
      let minHashSimilarity = compareSignatures(
        docA.minHashSignatures,
        docB.minHashSignatures
      );

      results.push({
        firstDocument,
        secondDocument,
        jaccardSimilarity,
        minHashSimilarity
      });
    }
  }
}

const SimilarDocuments = results.filter(
  result =>
    result.jaccardSimilarity >= config.JACCARD_SIMILARITY_THRESHOLD ||
    result.minHashSimilarity >= config.MINHASH_SIMILARITY_THRESHOLD
);
let lshReshult = '';
for (let doc of documents) {
  let matches: any = {};
  let hashbands = doc.lshHashBands;
  for (var i = 0; i < hashbands.length; i++) {
    var band = hashbands[i];
    for (var j = 0; j < index[band].length; j++) {
      matches[index[band][j]] = true;
    }
  }

  lshReshult =
    `\nMatches for ${doc.filePath.replace(
      /^.*[\\\/]/,
      ''
    )}: \n   ${JSON.stringify(matches, null, 2)}` + lshReshult;
}

let finalResults = '';
SimilarDocuments.forEach(doc => {
  finalResults =
    `\n Results : \n ${JSON.stringify(doc, null, 2)}` + finalResults;
});
fs.writeFileSync('output.txt', lshReshult + finalResults);
console.timeEnd('data-mining-assignment-1');

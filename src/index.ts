import * as fs from 'fs';
import * as path from 'path';
import compareSets from './compare-sets';
import _ from 'lodash';
import compareSignatures from './compare-signatures';
import minhash from './minhash';
import { Index, insertIntoLSHIndex, Band } from './lsh';
import shingling from './shingling';

interface Document {
  filePath: string;
  content: string;
  shinglesArray: string[];
  shingles: Set<string>;
  hashedShingles: number[];
  minHashSignatures: number[];
}

const DATA_PATH = path.resolve(__dirname, '../data');

const k = 4;

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

  documents.push({
    filePath,
    content,
    shinglesArray,
    shingles,
    hashedShingles,
    minHashSignatures
  });
}

interface Result {
  firstDocument: string;
  secondDocument: string;
  jaccardSimilarity: number;
  minHashSimilarity: number;
}

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

console.log(`Length of Results : ${results.length}`);

const threshHold = 0.7;

const SimilarDocuments = results.filter(
  result =>
    result.jaccardSimilarity >= threshHold ||
    result.minHashSimilarity >= threshHold
);

let index: Index = {
  bands: []
};

for (let doc of documents) {
  let fileName = doc.filePath.replace(/^.*[\\\/]/, '');
  index = insertIntoLSHIndex(fileName, doc.minHashSignatures, index);
}

let lshResults: Band[] = [];

for (let [i, docA] of documents.entries()) {
  for (let [j, docB] of documents.entries()) {
    if (i >= j && i !== j) {
      let firstDocument = docA.filePath.replace(/^.*[\\\/]/, '');
      let secondDocument = docB.filePath.replace(/^.*[\\\/]/, '');
      let resultIndex = index.bands.filter(
        band =>
          band.fileNames.includes(firstDocument) &&
          band.fileNames.includes(secondDocument)
      );
      if (resultIndex.length > 0) {
        console.log(
          `LSH result for ${firstDocument} and ${secondDocument} are  ${
            resultIndex.length
          }`
        );
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

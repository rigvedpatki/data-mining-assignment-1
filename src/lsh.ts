import config from './config';
import { Document } from './types';

const bandSize = config.LSH_BAND_SIZE;

export const getHashbands = (minhash: number[]): string[] => {
  const hashBands: string[] = [];
  for (let i = 0; i < minhash.length / bandSize; i++) {
    let start = i * bandSize;
    let end = start + bandSize;
    let band = minhash.slice(start, end);
    hashBands.push(band.join('.'));
  }
  return hashBands;
};

export const insertIntoLSHIndex = (documents: Document[]) => {
  let index: any = {};

  for (let doc of documents) {
    for (let i = 0; i < doc.lshHashBands.length; i++) {
      let band = doc.lshHashBands[i];
      if (Array.isArray(index[band])) {
        index[band].push(doc.filePath.replace(/^.*[\\\/]/, ''));
      } else {
        index[band] = [doc.filePath.replace(/^.*[\\\/]/, '')];
      }
    }
  }

  return index;
};

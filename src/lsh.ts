import { Index } from './types';
import config from './config';

const bandSize = config.LSH_BAND_SIZE;

const getHashbands = (minhash: number[]): string[] => {
  const hashBands: string[] = [];
  for (let i = 0; i < minhash.length / bandSize; i++) {
    let start = i * bandSize;
    let end = start + bandSize;
    let band = minhash.slice(start, end);
    hashBands.push(band.join('.'));
  }
  return hashBands;
};

export const insertIntoLSHIndex = (
  fileName: string,
  minhash: number[],
  index: Index
) => {
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

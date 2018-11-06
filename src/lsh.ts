const bandSize = 2;

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

export interface Band {
  hash: string;
  fileNames: string[];
}
export interface Index {
  bands: Band[];
}

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

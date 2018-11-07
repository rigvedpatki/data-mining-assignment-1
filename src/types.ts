export interface Document {
  filePath: string;
  content: string;
  shinglesArray: string[];
  shingles: Set<string>;
  hashedShingles: number[];
  minHashSignatures: number[];
}

export interface Result {
  firstDocument: string;
  secondDocument: string;
  jaccardSimilarity: number;
  minHashSimilarity: number;
}

export interface Band {
  hash: string;
  fileNames: string[];
}
export interface Index {
  bands: Band[];
}

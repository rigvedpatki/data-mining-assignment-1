const compareSets = (setA: number[], setB: number[]) => {
  let a = new Set(setA);
  let b = new Set(setB);
  let intersection = new Set([...a].filter(x => b.has(x)));
  let union = new Set([...a, ...b]);
  let jaccardSimilarity = intersection.size / union.size;
  return jaccardSimilarity;
};

export default compareSets;

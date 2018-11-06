const compareSignatures = (minhashA: number[], minhashB: number[]) => {
  let total = minhashA.length;
  let shared = 0;
  for (var i = 0; i < minhashA.length; i++) {
    if (minhashA[i] === minhashB[i]) {
      shared++;
    }
  }
  return shared / total;
};

export default compareSignatures;

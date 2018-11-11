"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compareSignatures = (minhashA, minhashB) => {
    let total = minhashA.length;
    let shared = 0;
    for (var i = 0; i < minhashA.length; i++) {
        if (minhashA[i] === minhashB[i]) {
            shared++;
        }
    }
    return shared / total;
};
exports.default = compareSignatures;
//# sourceMappingURL=compare-signatures.js.map
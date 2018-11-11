"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compareSets = (setA, setB) => {
    let a = new Set(setA);
    let b = new Set(setB);
    let intersection = new Set([...a].filter(x => b.has(x)));
    let union = new Set([...a, ...b]);
    let jaccardSimilarity = intersection.size / union.size;
    return jaccardSimilarity;
};
exports.default = compareSets;
//# sourceMappingURL=compare-sets.js.map
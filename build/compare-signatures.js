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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyZS1zaWduYXR1cmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBhcmUtc2lnbmF0dXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxRQUFrQixFQUFFLFFBQWtCLEVBQUUsRUFBRTtJQUNuRSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQzVCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQixNQUFNLEVBQUUsQ0FBQztTQUNWO0tBQ0Y7SUFDRCxPQUFPLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsaUJBQWlCLENBQUMifQ==
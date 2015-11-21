/// <reference path="../../typings/tsd" />
/// <reference path="../../app/js/main" />

"use strict";

describe("GbMapMin Boxer Service", () => {

    let boxer: GbMap.Boxer;

    beforeEach(() => {
        boxer = new GbMap.Boxer;
    });

    it("should be empty when new", () => {
        expect(boxer.getContainingBounds().isEmpty()).toBeTruthy();
    });

    it("should find bounds", () => {
        let info = [
            { lat: 6, lng: 5 },
            { lat: 5, lng: 2 },
            { lat: 2, lng: 6 },
            { lat: 7, lng: 1 },
            { lat: 4, lng: 4 }
        ];
        let lls = info.map((j) => new google.maps.LatLng(j.lat, j.lng, true));

        let bounds = boxer.getContainingBounds(lls);

        expect(bounds.toString()).toBe("((2, 1), (7, 6))");

        expect(bounds.getCenter().toString()).toBe("(4.5, 3.5)");
    });
});

// describe("GbMapMin Math Service", () => {
//     it("Should add asynchronously", (done) => {
//         new MathService().doAdd(6, 7).then((sum) => {
//             expect(sum).toEqual(13);
//             done();
//         });
//     });
// });

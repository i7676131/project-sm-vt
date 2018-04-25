let expect = require("chai").expect;
let converter = require("../public/javascripts/helpers/milliseconds");

describe("Time Converter", () => {

    describe("Minutes to milliseconds converter", () => {
        it("converts time to milliseconds", () => {

            let success = converter.minsToMills(5);
            let notANumber = converter.minsToMills("five");
            let empty = converter.minsToMills('');

            expect(success).to.equal(300000);
            expect(notANumber).to.equal(900000);
            expect(empty).to.equal(900000);

        });
    });

    describe("Seconds to milliseconds converter", () => {
        it("converts time to milliseconds", () => {

            let success = converter.secsToMills(5);
            let notANumber = converter.secsToMills("five");
            let empty = converter.secsToMills('');

            expect(success).to.equal(5000);
            expect(notANumber).to.equal(10000);
            expect(empty).to.equal(10000);

        });
    });
});





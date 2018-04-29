let expect = require("chai").expect;
let request = require("request");
let converter = require("../public/javascripts/helpers/milliseconds");

describe("Slide Speed API and Converter", () => {

    describe("Slide Speed API", () => {

        let urlSlideSpeed = 'http://localhost:3000/social-slide/api/get/slide-speed';

        it("Gets slide speed from database", (done) => {

            request(urlSlideSpeed, (err, resp, body) => {
                let obj = JSON.parse(body);

                expect(resp.statusCode).to.equal(200);
                expect(obj).to.equal(15000);
                done();

            });
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





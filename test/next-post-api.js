let expect = require("chai").expect;
let request = require("request");

describe("Social Slide API Calls", () => {

    describe("Social Slide API", () => {

        let urlNextSlide = 'http://localhost:3000/social-slide/api/get/next-post';

        it("Gets next tweet from database", (done) => {

            request(urlNextSlide, (err, resp, body) => {
                let obj = JSON.parse(body);

                expect(resp.statusCode).to.equal(200);
                expect(obj.smName).to.equal("Amy");
                done();

            });
        });
    });
});




